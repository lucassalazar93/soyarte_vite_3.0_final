import HeroArticulo from "./HeroArticulo";
import ContenidoPrincipal from "./ContenidoPrincipal";
import Multimedia from "./Multimedia";
import HistoriasReflexiones from "./HistoriasReflexiones";
import VideoYoutube from "./VideoYoutube";

const ArticuloIzquierda = ({ articulo }) => {
  const baseUrl = import.meta.env.VITE_API_URL;

  return (
    <div className="articulo-izquierda">
      <HeroArticulo
        titulo={articulo.titulo}
        resumen={articulo.resumen}
        imagen={`${baseUrl}${articulo.imagen}`}
      />
      <ContenidoPrincipal
        pregunta={articulo.pregunta}
        contenido={articulo.contenido}
      />
      <Multimedia
        audio_url={`${baseUrl}${articulo.audio_url}`}
        musica_url={`${baseUrl}${articulo.musica_url}`}
      />
      <HistoriasReflexiones
        mini_historias={articulo.mini_historias}
        reflexiones={articulo.reflexiones}
      />
      <VideoYoutube youtube_embed={articulo.youtube_embed} />
    </div>
  );
};

export default ArticuloIzquierda;
