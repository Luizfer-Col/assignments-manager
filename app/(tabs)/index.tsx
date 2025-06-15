import { InputLabel } from '@/components/ui/customInput';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 p-6 gap-6">
      <Text className="text-destructive mb-4-">Tab Home</Text>

      <InputLabel label="Email" placeholder="tu@email.com" />

      <InputLabel label="Nombre" layout="horizontal" placeholder="Tu nombre completo" />

      <InputLabel label="Contraseña" error="La contraseña es requerida" secureTextEntry />

      <InputLabel label="Búsqueda" variant="ghost" placeholder="Buscar..." />
    </View>
  );
}
