// Всё содержимое подарка. Файлы кладутся в папку media/ рядом с index.html.
// src: null — показывается заглушка, пока нет настоящего фото.
window.GIFT = {
  boxLabelTop: "Для моей",
  boxLabel: "Принцессы",
  lidMessage: "Потому что ты заслуживаешь всего самого красивого в этом мире",
  openHint: "Нажми на коробку, чтобы открыть",
  insideHint: "Крути коробку и загляни внутрь 👀",
  albumHint: "Нажми, чтобы открыть альбом",
  albumBadge: "Lovely Album",
  albumTitle: "Ты заслуживаешь всего самого красивого",
  albumSubtitle: "Нажми на каждый квадратик, чтобы перевернуть его и увидеть фото ✨",
  albumIntro: "«Моей Принцессе: потому что ты заслуживаешь всего самого красивого в этом мире.» 💕",
  rainButton: "Отправить дождь из сердец",

  // type: "photo" | "video"
  items: [
    { type: "photo", src: "media/photos/1.jpg" },
    { type: "photo", src: "media/photos/2.jpg" },
    { type: "photo", src: "media/photos/3.jpg" },
    { type: "photo", src: "media/photos/4.jpg" },
    { type: "photo", src: "media/photos/5.jpg" },
    { type: "photo", src: "media/photos/6.jpg" }
  ],

  // Если список пуст — кассета просто лежит в коробке, без музыки.
  music: [
    { src: "media/music/1.mp3", title: "fem.love — Фотографирую закат" },
    { src: "media/music/2.mp3", title: "Dan Korshunov, Тахмина Умалатова — Фиолетовое лето" },
    { src: "media/music/3.mp3", title: "MIA BOYKA — Экспонат" },
    { src: "media/music/4.mp3", title: "ATL — Танцуйте" }
  ],
  cassetteLabel: "Для тебя ♥",
  musicStartsOnOpen: true
};
