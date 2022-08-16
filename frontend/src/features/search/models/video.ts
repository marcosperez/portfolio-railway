export interface Video {
  title: string;
  subtitle: string;
  id: string;

  getLink(): string;
  getImgUrl(): string;
}

export class YoutubeVideo implements Video {
  title: string = "";
  subtitle: string = "";
  id: string = "";

  getLink(): string {
    return `https://www.youtube.com/watch?v=${this.id}`;
  }

  getImgUrl(): string {
    return `https://img.youtube.com/vi/${this.id}/0.jpg`;
  }

  /**
   * Instance YoutubeVideo objects
   * @param videoData
   * @returns
   */
  static MapperYoutubeVideo(videoData: Partial<YoutubeVideo>) {
    const youtubeVideo = new YoutubeVideo();
    Object.assign(youtubeVideo, videoData);

    return youtubeVideo;
  }
}
