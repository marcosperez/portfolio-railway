import { useEffect, useState } from "react";
import { SearchBar } from "../features/search/components/SearchBar";
import { VideoList } from "../features/search/components/VideoList";
import { Video, YoutubeVideo } from "../features/search/models/video";
import "./SearchVideos.scss";

const videosMock: Video[] = [
  YoutubeVideo.MapperYoutubeVideo({
    id: "ogkUxSmv83M",
    title: "Esto es un video",
    subtitle: "canada",
  }),
  YoutubeVideo.MapperYoutubeVideo({
    id: "lj_EK0Crh8I",
    title: "Musica",
    subtitle: "cantante",
  }),
  YoutubeVideo.MapperYoutubeVideo({
    id: "IDuTyV6iCmo",
    title: "LA MEGA GUIA de Viaje a Nueva York del 2022",
    subtitle: "Resilentos",
  }),
  YoutubeVideo.MapperYoutubeVideo({
    id: "gPgAO4G5n8s",
    title:
      "Venezuela desaparece de los medios, ¿por qué? El despegue económico venezolano",
    subtitle: "Inna Afinogenova",
  }),
  YoutubeVideo.MapperYoutubeVideo({
    id: "ogkUx2mv83M",
    title: "Esto es un video",
    subtitle: "canada",
  }),
  YoutubeVideo.MapperYoutubeVideo({
    id: "lj_EK0Csh8I",
    title: "Musica",
    subtitle: "cantante",
  }),
  YoutubeVideo.MapperYoutubeVideo({
    id: "IDuTyV6i2mo",
    title: "LA MEGA GUIA de Viaje a Nueva York del 2022",
    subtitle: "Resilentos",
  }),
  YoutubeVideo.MapperYoutubeVideo({
    id: "gPgAO1G5n8s",
    title:
      "Venezuela desaparece de los medios, ¿por qué? El despegue económico venezolano",
    subtitle: "Inna Afinogenova",
  }),
  YoutubeVideo.MapperYoutubeVideo({
    id: "ogkUxSmv89M",
    title: "Esto es un video",
    subtitle: "canada",
  }),
  YoutubeVideo.MapperYoutubeVideo({
    id: "l12EK0Crh8I",
    title: "Musica",
    subtitle: "cantante",
  }),
  YoutubeVideo.MapperYoutubeVideo({
    id: "ID3TyV6iCmo",
    title: "LA MEGA GUIA de Viaje a Nueva York del 2022",
    subtitle: "Resilentos",
  }),
  YoutubeVideo.MapperYoutubeVideo({
    id: "gPgAO1G518s",
    title:
      "Venezuela desaparece de los medios, ¿por qué? El despegue económico venezolano",
    subtitle: "Inna Afinogenova",
  }),
];

function SearchVideos() {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    setVideos(videosMock);

    return () => {
      setVideos([]);
    };
  }, []);

  return (
    <div className="SearchVideos">
      <SearchBar key="SearchBar"></SearchBar>
      <VideoList videos={videos} key="VideosList"></VideoList>
    </div>
  );
}

export default SearchVideos;
