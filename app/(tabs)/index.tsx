import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';

type DiaSemana = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes';

type Idioma = 'es' | 'en';

const { width, height } = Dimensions.get('window');

export default function PantallaInicio() {
  const [diaActual, setDiaActual] = useState<DiaSemana>('lunes');
  const [tamanoFuente, setTamanoFuente] = useState(18);
  const [idioma, setIdioma] = useState<Idioma>('es');
  const [metas, setMetas] = useState<Record<DiaSemana, { nombre: string; descripcion: string; estado: 'pendiente' | 'cumplida' }>>({
    lunes: { nombre: '', descripcion: '', estado: 'pendiente' },
    martes: { nombre: '', descripcion: '', estado: 'pendiente' },
    miercoles: { nombre: '', descripcion: '', estado: 'pendiente' },
    jueves: { nombre: '', descripcion: '', estado: 'pendiente' },
    viernes: { nombre: '', descripcion: '', estado: 'pendiente' },
  });

  const coloresDeFondo: Record<DiaSemana, string> = {
    lunes: '#D1F7FF',
    martes: '#F7E1D7',
    miercoles: '#D7F7D1',
    jueves: '#F7F7D7',
    viernes: '#F0D7FF',
  };

  const traducciones = {
    es: {
      saludo: 'Diario de Metas Semanales',
      metaNombre: 'Nombre de la meta',
      metaDescripcion: 'Descripción de la meta',
      textoSlider: 'Tamaño de texto:',
      estadoMeta: {
        pendiente: 'Pendiente',
        cumplida: 'Cumplida',
      },
    },
    en: {
      saludo: 'Weekly Goals Diary',
      metaNombre: 'Goal Name',
      metaDescripcion: 'Goal Description',
      textoSlider: 'Text Size:',
      estadoMeta: {
        pendiente: 'Pending',
        cumplida: 'Completed',
      },
    },
  };

  const diasOrdenados: DiaSemana[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];

  const siguienteDia = () => {
    const indiceActual = diasOrdenados.indexOf(diaActual);
    const nuevoIndice = (indiceActual + 1) % diasOrdenados.length;
    setDiaActual(diasOrdenados[nuevoIndice]);
  };

  const anteriorDia = () => {
    const indiceActual = diasOrdenados.indexOf(diaActual);
    const nuevoIndice = (indiceActual - 1 + diasOrdenados.length) % diasOrdenados.length;
    setDiaActual(diasOrdenados[nuevoIndice]);
  };

  const actualizarMeta = (campo: 'nombre' | 'descripcion', texto: string) => {
    setMetas((prevMetas) => ({
      ...prevMetas,
      [diaActual]: { ...prevMetas[diaActual], [campo]: texto },
    }));
  };

  const cambiarEstadoMeta = () => {
    setMetas((prevMetas) => ({
      ...prevMetas,
      [diaActual]: {
        ...prevMetas[diaActual],
        estado: prevMetas[diaActual].estado === 'pendiente' ? 'cumplida' : 'pendiente',
      },
    }));
  };

  return (
    <ScrollView contentContainerStyle={[styles.contenedor, { backgroundColor: coloresDeFondo[diaActual] }]}>
      <View style={styles.header}>
        <Text style={[styles.textoEncabezado, { fontSize: tamanoFuente }]}>
          Fabián Cornejo ISFT220
        </Text>
      </View>
      <Text style={[styles.textoEncabezado, { fontSize: tamanoFuente }]}>
        {traducciones[idioma as keyof typeof traducciones].saludo}
      </Text>
      <View style={styles.card}>
        <Text style={[styles.textoDia, { fontSize: tamanoFuente }]}>{diaActual.toUpperCase()}</Text>
        <TextInput
          style={[styles.entrada, { fontSize: tamanoFuente }]}
          placeholder={traducciones[idioma].metaNombre}
          value={metas[diaActual].nombre}
          onChangeText={(texto) => actualizarMeta('nombre', texto)}
        />
        <TextInput
          style={[styles.entrada, { fontSize: tamanoFuente }]}
          placeholder={traducciones[idioma].metaDescripcion}
          value={metas[diaActual].descripcion}
          onChangeText={(texto) => actualizarMeta('descripcion', texto)}
        />
        <Text style={[styles.textoEstado, { fontSize: tamanoFuente }]}>
          {traducciones[idioma].estadoMeta[metas[diaActual].estado]}
        </Text>
        <TouchableOpacity onPress={cambiarEstadoMeta} style={styles.botonEstado}>
          <Text style={styles.textoBoton}>Cambiar Estado</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={anteriorDia} style={styles.botonAnterior}>
          <Text style={styles.textoBoton}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={siguienteDia} style={styles.botonSiguiente}>
          <Text style={styles.textoBoton}>Siguiente</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={18}
          maximumValue={48}
          step={1}
          value={tamanoFuente}
          onValueChange={setTamanoFuente}
        />
        <Text style={[styles.textoSlider, { fontSize: tamanoFuente }]}>
          {traducciones[idioma].textoSlider} {tamanoFuente}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    alignItems: 'center',
    padding: width * 0.05,
  },
  header: { width: '100%', alignItems: 'center', marginBottom: 20},
  textoEncabezado: { fontWeight: 'bold', marginBottom: 10, },
  card: {
    backgroundColor: '#f5f4f4',
    padding: 20,
    borderRadius: 10,
    width: width * 0.5,
    alignItems: 'center',
  },
  textoDia: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: width * 0.05,
  },
  entrada: {
    width: '90%',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  textoEstado: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  botonEstado: {
    backgroundColor: '#28a745',
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
  },
  botonSiguiente: {
    backgroundColor: '#007bff',
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  botonAnterior: {
    backgroundColor: '#007bff',
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  sliderContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  slider: {
    width: width * 0.2,
    height: 40,
  },
  textoSlider: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});