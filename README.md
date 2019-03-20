# UberClone-APP-React-Native-

Interface APP uber React native</br>
Usando API do google maps geolocation.</br>
video referencia -> https://www.youtube.com/watch?v=bg-U0xZwcRk&t=92s</br>
Agradecimentos ao tutor: Diego Fernandes da Rocketseat</br>
Para emular no Android seguir alguns passos de configuração de API...</br>
Erros de AIRMAP: implementar uma nova função.</br>
MapView.js => em node_modules/react-native-maps/lib/components/MapView.js </br>
//função provavelmente na linha 814. </br>
 </br>_uiManagerCommand(name) { </br>
    const UIManager = NativeModules.UIManager; </br>
    const componentName = getAirMapName(this.props.provider); </br>
 </br>
    if (!UIManager.getViewManagerConfig) { </br>
      // RN < 0.58 </br>
      return UIManager[componentName].Commands[name]; </br>
    } </br>
 </br>
    // RN >= 0.58 </br>
    return UIManager.getViewManagerConfig(componentName).Commands[name]; </br>
  } </br>
Erro ao passar objeto de localização no android:solução:parseFloat.</br>
Possivel erro ao renderizar map: solução implementar esse trecho de codigo a baixo.
</br>// This line made Gradle sync successfully</br>
  implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"
  
<a href="https://imgflip.com/gif/2wfisv"><img src="https://i.imgflip.com/2wfisv.gif" title="made at imgflip.com"/></a>
