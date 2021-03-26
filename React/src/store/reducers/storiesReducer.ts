const initState = {
  stories: [
    {
      title: 'Latin Story',
      description: 'Learn Latin!',
      level: 'Intermediate',
      text:
        'Reprehenderit assumenda veniam officiis dignissimos, laborum facilis illum dolores nam modi, quibusdam ea! Rem temporibus doloribus iste illum dolorem vitae sint. Reprehenderit assumenda veniam officiis dignissimos, laborum facilis illum dolores nam modi, quibusdam ea! Rem temporibus doloribus iste illum dolorem vitae sint Reprehenderit assumenda veniam officiis dignissimos, laborum facilis illum dolores nam modi, quibusdam ea! Rem temporibus doloribus iste illum dolorem vitae sint. Reprehenderit assumenda veniam officiis dignissimos, laborum facilis illum dolores nam modi, quibusdam ea! Rem temporibus doloribus iste illum dolorem vitae sint. Reprehenderit assumenda veniam officiis dignissimos, laborum facilis illum dolores nam modi, quibusdam ea! Rem temporibus doloribus iste illum dolorem vitae sint. Reprehenderit assumenda veniam officiis dignissimos, laborum facilis illum dolores nam modi, quibusdam ea! Rem temporibus doloribus iste illum dolorem vitae sint. Reprehenderit assumenda veniam officiis dignissimos, laborum facilis illum dolores nam modi, quibusdam ea! Rem temporibus doloribus iste illum dolorem vitae sint. Reprehenderit assumenda veniam officiis dignissimos, laborum facilis illum dolores nam modi, quibusdam ea! Rem temporibus doloribus iste illum dolorem vitae sint.',
      author: 'Socrates',
      link: 'http://blog-imgs-42.fc2.com/k/o/g/kogielu/img.jpg',
      _id: 1,
    },
    {
      title: 'Зимнее Утро',
      description: 'Learn Russian',
      level: 'Intermediate',
      text:
        'Мороз и солнце; день чудесный!  Еще ты дремлешь, друг прелестный — Пора, красавица, проснись: Открой сомкнуты негой взоры Навстречу северной Авроры, Звездою севера явись! Вечор, ты помнишь, вьюга злилась, На мутном небе мгла носилась; Луна, как бледное пятно, Сквозь тучи мрачные желтела, И ты печальная сидела — А нынче... погляди в окно: Под голубыми небесами Великолепными коврами, Блестя на солнце, снег лежит; Прозрачный лес один чернеет, И ель сквозь иней зеленеет, И речка подо льдом блестит. Вся комната янтарным блеском Озарена. Веселым треском Трещит затопленная печь. Приятно думать у лежанки. Но знаешь: не велеть ли в санки Кобылку бурую запречь? Скользя по утреннему снегу, друг милый, предадимся бегу нетерпеливого коня и навестим поля пустые, леса, недавно столь густые, и берег, милый для меня.',
      author: 'Пушкин',
      link: 'https://dic.academic.ru/pictures/enc_literature/i_430.jpg',
      _id: 2,
    },
    {
      title: '小小少年',
      description: 'Chinese Story',
      level: 'Intermediate',
      text:
        '小小 少年，很少 烦恼, 眼望 四周 阳光照。小小 少年,很少 烦恼，但愿永远这样好。一年一年时间飞跑，小小少年在长高。随着年岁由小变大，他的烦恼增加了。小小少年，很少烦恼，无忧无虑乐陶陶。但有一天，风波突起，忧虑烦恼都到了。一年一年时间飞跑，小小少年在长高。随着年岁由小变大，他的烦恼增加了。',
      author: 'Haru',
      link:
        'https://thumbs.dreamstime.com/b/head-shoulders-portrait-chinese-boy-26098895.jpg',
      _id: 3,
    },
  ],
  curStory: [{}],
  words: [''],
  curWord: 0,
  sentences: [''],
  curSentence: [],
  isWord: false,
};

const storiesReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default storiesReducer;
