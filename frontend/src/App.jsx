import { useState } from 'react';
import axios from 'axios';
import { auth, db, storage } from './firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isLogin, setIsLogin] = useState(true);

  // Inscription
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      setEmail('');
      setPassword('');
    } catch (error) {
      alert('Erreur: ' + error.message);
    }
  };

  // Connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      loadHistory(userCredential.user.uid);
      setEmail('');
      setPassword('');
    } catch (error) {
      alert('Erreur: ' + error.message);
    }
  };

  // Déconnexion
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setHistory([]);
  };

  // Charger l'historique
  const loadHistory = async (userId) => {
    try {
      const q = query(
        collection(db, 'verifications'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const docs = [];
      snapshot.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setHistory(docs);
    } catch (error) {
      console.log('Erreur chargement historique:', error);
    }
  };

  // Upload image
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Analyser l'image
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Veuillez sélectionner une image');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('userId', user.uid);

    try {
      const response = await axios.post('http://localhost:3001/api/authenticate', formData);
      
      // Sauvegarde en Firestore
      await addDoc(collection(db, 'verifications'), {
        userId: user.uid,
        result: response.data,
        createdAt: new Date(),
        timestamp: Date.now()
      });

      setResult(response.data);
      loadHistory(user.uid);
      setImage(null);
      setPreview(null);
    } catch (error) {
      alert('Erreur: ' + error.message);
    }
    setLoading(false);
  };

  // Écran de connexion
  if (!user) {
    return (
      <div className="app">
        <div className="auth-container">
          <h1>🔐 VERITAS</h1>
          <p>Authentifiez vos articles de luxe</p>
          
          <form onSubmit={isLogin ? handleLogin : handleSignUp}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">
              {isLogin ? 'Se connecter' : 'S\'inscrire'}
            </button>
          </form>

          <p className="toggle-auth">
            {isLogin ? 'Pas encore de compte? ' : 'Déjà inscrit? '}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'S\'inscrire' : 'Se connecter'}
            </span>
          </p>
        </div>
      </div>
    );
  }

  // Écran principal (authentifié)
  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>🔐 VERITAS</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Déconnexion ({user.email})
          </button>
        </div>

        {!result ? (
          <form onSubmit={handleSubmit}>
            <div className="upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="imageInput"
              />
              <label htmlFor="imageInput">
                📸 Cliquez pour sélectionner une image
              </label>
            </div>

            {preview && (
              <div className="preview">
                <img src={preview} alt="Aperçu" />
              </div>
            )}

            <button type="submit" disabled={loading}>
              {loading ? 'Analyse en cours...' : 'Analyser'}
            </button>
          </form>
        ) : (
          <div className="result">
            <h2 style={{ color: result.color }}>
              {result.status}
            </h2>
            <p>Confiance: <strong>{result.confidence}%</strong></p>
            
            <div className="confidence-bar">
              <div 
                className="confidence-fill" 
                style={{ 
                  width: `${result.confidence}%`,
                  backgroundColor: result.color
                }}
              ></div>
            </div>

            <div className="details">
              {result.details.map((detail, idx) => (
                <div key={idx} className="detail-item">
                  <span className="icon">{detail.icon}</span>
                  <div>
                    <p className="label">{detail.label}</p>
                    <p className="value">{detail.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={() => { setResult(null); setImage(null); setPreview(null); }}>
              Nouvelle vérification
            </button>
          </div>
        )}

        {history.length > 0 && (
          <div className="history">
            <h3>Historique ({history.length})</h3>
            <div className="history-list">
              {history.slice(0, 5).map(item => (
                <div key={item.id} className="history-item">
                  <span style={{ color: item.result.color }}>
                    {item.result.status}
                  </span>
                  <span>{item.result.confidence}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
