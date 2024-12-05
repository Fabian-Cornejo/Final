import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';

// Definimos un tipo para los días de la semana
type DiaSemana = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes';

// Definimos un tipo para los idiomas válidos
type Idioma = 'es' | 'en';

export default function PantallaInicio() {
  // Usamos el tipo DiaSemana para definir las metas de cada día
  const [metas, setMetas] = useState<{
    [key in DiaSemana]: { nombre: string; descripcion: string };
  }>({
    lunes: { nombre: '', descripcion: '' },
    martes: { nombre: '', descripcion: '' },
    miercoles: { nombre: '', descripcion: '' },
    jueves: { nombre: '', descripcion: '' },
    viernes: { nombre: '', descripcion: '' },
  });

  const [colorFondo, setColorFondo] = useState('#fff'); // color de fondo inicial
  const [tamanoFuente, setTamanoFuente] = useState(18);
  const [idioma, setIdioma] = useState<Idioma>('es'); // Ahora el tipo es 'es' | 'en'

  // Traducciones de los días
  const traduccionesDias = {
    es: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  };

  const coloresDeFondo = ['#D1F7FF', '#F7E1D7', '#D7F7D1', '#F7F7D7', '#F0D7FF']; // Colores suaves

  const traducciones = {
    es: {
      saludo: 'Diario de Metas Semanales',
      metaNombre: 'Nombre de la meta',
      metaDescripcion: 'Descripción de la meta',
      textoSlider: 'Tamaño de texto:',
    },
    en: {
      saludo: 'Weekly Goals Diary',
      metaNombre: 'Goal Name',
      metaDescripcion: 'Goal Description',
      textoSlider: 'Text Size:',
    },
  };

  // Función para actualizar las metas de cada día
  const actualizarMeta = (dia: DiaSemana, campo: 'nombre' | 'descripcion', texto: string) => {
    setMetas((prevMetas) => ({
      ...prevMetas,
      [dia]: { ...prevMetas[dia], [campo]: texto },
    }));
  };

  // Cambiar el color de fondo al seleccionar un día
  const cambiarColorFondo = (indice: number) => {
    setColorFondo(coloresDeFondo[indice]);
  };

  return (
    <ScrollView contentContainerStyle={[estilos.contenedor, { backgroundColor: colorFondo }]}>
      {/* Encabezado */}
      <View style={estilos.encabezado}>
        <Text style={estilos.textoEncabezadoIzquierda}>Fabian Cornejo</Text>
        <Text style={estilos.textoEncabezadoIzquierda}>ISFT °220</Text>
        <Text style={estilos.textoEncabezadoCentro}>{traducciones[idioma].saludo}</Text>
      </View>

      {/* Aquí agregamos los TextInputs para las metas de cada día */}
      <View style={estilos.contenedorDias}>
        {traduccionesDias[idioma].map((dia, index) => {
          const diaClave: DiaSemana = dia.toLowerCase() as DiaSemana; // Convertimos el nombre a la clave correspondiente en el objeto metas
          return (
            <View key={index} style={[estilos.columnaDia, { borderRightWidth: index < traduccionesDias[idioma].length - 1 ? 1 : 0 }]}>
              <TouchableOpacity onPress={() => cambiarColorFondo(index)} style={estilos.botonDia}>
                <Text style={[estilos.textoDia, { fontSize: tamanoFuente }]}>
                  {dia}
                </Text>
              </TouchableOpacity>

              {/* Nombre de la meta */}
              <TextInput
                style={estilos.entrada}
                placeholder={traducciones[idioma].metaNombre}
                value={metas[diaClave]?.nombre || ''}
                onChangeText={(texto) => actualizarMeta(diaClave, 'nombre', texto)}
              />
              {/* Descripción de la meta */}
              <TextInput
                style={estilos.entrada}
                placeholder={traducciones[idioma].metaDescripcion}
                value={metas[diaClave]?.descripcion || ''}
                onChangeText={(texto) => actualizarMeta(diaClave, 'descripcion', texto)}
              />
            </View>
          );
        })}
      </View>

      {/* Contenedor de los botones de idioma y slider (ubicados abajo) */}
      <View style={estilos.botonYSlider}>
        {/* Botones de idioma */}
        <View style={estilos.botonIdioma}>
          <TouchableOpacity onPress={() => setIdioma('es')} style={estilos.boton}>
            <Text style={estilos.textoBoton}>Español</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIdioma('en')} style={estilos.boton}>
            <Text style={estilos.textoBoton}>English</Text>
          </TouchableOpacity>
        </View>

        {/* Slider y tamaño de texto */}
        <View style={estilos.sliderContainer}>
          <Slider
            style={estilos.slider}
            minimumValue={15}
            maximumValue={48}
            step={1}
            value={tamanoFuente}
            onValueChange={setTamanoFuente}
          />
          <Text style={estilos.textoSlider}>{traducciones[idioma].textoSlider} {tamanoFuente}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flexGrow: 1, // Esto asegura que el contenido crezca y se pueda desplazar
    padding: 20,
    justifyContent: 'flex-start',
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 15,
    marginBottom: 20,
  },
  textoEncabezadoIzquierda: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  textoEncabezadoCentro: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Para que el texto se alinee al centro
  },
  textoDia: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  botonDia: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  entrada: {
    height: 40,
    width: '80%', // Ajustamos el ancho para que quede más centrado
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  contenedorDias: {
    flexDirection: 'row', // Para alinear los días horizontalmente
    justifyContent: 'space-between', // Asegura que los días estén separados
    marginTop: 10,
    marginBottom: 20,
    flexWrap: 'wrap', // Permite que los días se ajusten si la pantalla es pequeña
  },
  columnaDia: {
    alignItems: 'center',
    width: '18%', // Para asegurar que todos los días quepan bien en la pantalla
    marginBottom: 20,
    borderRightWidth: 1,
    borderColor: '#000', // Línea de separación de los días en negro
    paddingRight: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    width: 180,
    height: 40,
  },
  textoSlider: {
    fontSize: 16,
    marginLeft: 10,
  },
  botonYSlider: {
    marginTop: 20,
    alignItems: 'center',
  },
  botonIdioma: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  boton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
  },
});

