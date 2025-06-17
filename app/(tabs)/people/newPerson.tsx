import { InputLabel } from '@/components/ui/customInput';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

// Esquema de validación
const personalInfoSchema = z.object({
  gender: z.enum(['hombre', 'mujer']),
  firstName: z.string().min(1, 'Nombre es requerido'),
  lastName: z.string().min(1, 'Apellido es requerido'),
  phone: z.string().optional(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  emails: z.string().email('Email inválido').optional().or(z.literal('')),
  address: z.string().optional(),
  spiritualStatus: z.enum([
    'Estudiante',
    'Publicador',
    'Bautizado',
    'Siervo Ministerial',
    'Anciano',
  ]),
});

type FormValues = z.infer<typeof personalInfoSchema>;

const GroupColumns = ({ children }: { children: React.ReactNode }) => (
  <View className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>{children}</View>
);

const defaultValues: FormValues = {
  gender: 'hombre',
  firstName: '',
  lastName: '',
  spiritualStatus: 'Estudiante',
  phone: '',
  email: '',
  address: '',
};

export default function NewPersonScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    Alert.alert('Formulario enviado', JSON.stringify(data, null, 2));
  };

  return (
    <ScrollView
      className="bg-white p-4 gap-4"
      contentContainerClassName="p-4 grow-1"
      keyboardShouldPersistTaps="always"
    >
      <Text className="text-xl font-bold mb-4 text-gray-800">Información personal</Text>

      {/* Género */}
      <View>
        <Text className="text-sm font-medium mb-2 mt-3 text-gray-700">Género</Text>
        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange, value } }) => (
            <View className="flex-row gap-4">
              {(['hombre', 'mujer'] as const).map(option => (
                <TouchableOpacity
                  key={option}
                  onPress={() => onChange(option)}
                  className="flex-row items-center"
                >
                  <View
                    className={`w-5 h-5 rounded-full border mr-2 items-center justify-center 
                      ${value === option ? 'border-blue-500' : 'border-gray-400'}`}
                  >
                    {value === option && <View className="w-3 h-3 rounded-full bg-blue-500" />}
                  </View>
                  <Text className="capitalize text-gray-800">{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>

      <GroupColumns>
        {/* Nombre */}
        <Controller
          control={control}
          name="firstName"
          render={({ field: { onChange, value, onBlur } }) => (
            <InputLabel
              key="firstName"
              label="Nombre*"
              placeholder="María"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors?.firstName?.message}
            />
          )}
        />

        {/* Apellido */}
        <Controller
          control={control}
          name="lastName"
          render={({ field: { onChange, value } }) => (
            <InputLabel
              key="lastName"
              label="Apellido*"
              placeholder="Magdalena"
              value={value}
              onChangeText={onChange}
              error={errors?.lastName?.message}
            />
          )}
        />
      </GroupColumns>

      <GroupColumns>
        {/* Teléfono */}
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, value } }) => (
            <InputLabel
              label="Teléfono"
              placeholder="3001234567"
              value={value}
              onChangeText={onChange}
              error={errors?.phone?.message}
            />
          )}
        />

        {/* Email */}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <InputLabel
              label="Email"
              placeholder="mariamagdalena@email.com"
              value={value}
              onChangeText={onChange}
              error={errors?.email?.message}
            />
          )}
        />
      </GroupColumns>

      <GroupColumns>
        {/* Dirección */}
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, value } }) => (
            <InputLabel
              label="Dirección"
              placeholder="Calle 123"
              value={value}
              onChangeText={onChange}
              error={errors?.address?.message}
            />
          )}
        />

        {/* Estado espiritual */}
        <View>
          <Text className="text-sm font-medium mb-1 text-gray-700">Estado espiritual</Text>
          <Controller
            control={control}
            name="spiritualStatus"
            render={({ field: { onChange, value } }) => (
              <Select defaultValue={{ value: 'apple', label: 'Apple' }} onValueChange={onChange}>
                <SelectTrigger>
                  <SelectValue
                    className="text-foreground text-sm native:text-lg"
                    placeholder="Select a fruit"
                  />
                </SelectTrigger>
                <SelectContent animated={false}>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem label="Apple" value="apple">
                      Apple
                    </SelectItem>
                    <SelectItem label="Banana" value="banana">
                      Banana
                    </SelectItem>
                    <SelectItem label="Blueberry" value="blueberry">
                      Blueberry
                    </SelectItem>
                    <SelectItem label="Grapes" value="grapes">
                      Grapes
                    </SelectItem>
                    <SelectItem label="Pineapple" value="pineapple">
                      Pineapple
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </View>
      </GroupColumns>

      {/* Botón alineado a la derecha */}
      <View className="flex-row justify-end mt-6">
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className={`bg-blue-500 py-3 px-8 rounded-lg ${!isValid ? 'opacity-50' : 'opacity-100'}`}
          disabled={!isValid}
        >
          <Text className="text-white font-medium">Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
