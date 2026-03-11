import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#667eea' }}>
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#fff' }}>🔐 VERITAS</Text>
      <Text style={{ fontSize: 18, color: '#fff', marginTop: 10 }}>App Mobile ✓</Text>
    </View>
  );
}
