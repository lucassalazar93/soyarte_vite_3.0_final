const formatearYoutubeEmbed = (url) => {
    if (!url) return "";
    const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };
  
  const VideoYoutube = ({ youtube_embed }) => {
    const embedUrl = formatearYoutubeEmbed(youtube_embed);
  
    return (
      embedUrl && (
        <section className="video-relacionado">
          <div className="iframe-wrapper">
            <div className="iframe-responsive">
              <iframe
                src={embedUrl}
                title="Video relacionado"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      )
    );
  };
  
  export default VideoYoutube;
  