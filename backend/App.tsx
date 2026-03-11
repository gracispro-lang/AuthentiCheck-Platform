import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Remplis tous les champs');
      return;
    }
    
    // Simulation d'authentification
    setUser({
      email,
      name: email.split('@')[0]
    });
    setEmail('');
    setPassword('');
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.authContainer}>
          <Text style={styles.logo}>🔐</Text>
          <Text style={styles.title}>VERITAS</Text>
          <Text style={styles.subtitle}>Authentifiez vos articles</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity style={styles.button} onPress={handleAuth}>
            <Text style={styles.buttonText}>
              {isLogin ? 'Se connecter' : 'S\'inscrire'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.toggleText}>
              {isLogin ? 'Pas encore de compte? S\'inscrire' : 'Déjà inscrit? Se connecter'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔐 VERITAS</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.welcomeText}>Bienvenue {user.name} ! 👋</Text>
        <Text style={styles.subtitle}>Vérifiez l'authenticité de vos articles</Text>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📸 Prendre une photo</Text>
          <Text style={styles.cardText}>Utilisez votre caméra pour scanner un article</Text>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Ouvrir la caméra</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📁 Uploader une image</Text>
          <Text style={styles.cardText}>Sélectionnez une image de votre galerie</Text>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Choisir une image</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>✨ Résultats rapides</Text>
          <Text style={styles.cardText}>Obtenez un résultat en moins de 5 secondes</Text>
          <Text style={styles.cardStats}>Confiance: 92%</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#667eea',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#667eea',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#667eea',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutBtn: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  cardStats: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
  },
  actionBtn: {
    backgroundColor: '#667eea',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
