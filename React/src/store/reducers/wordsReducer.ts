const initState = {
  savedWords: [
    {
      word: 'I love Sasha',
      trans: 'I love her',
      date: Date.now,
      _id: 1,
      story: {
        _id: 2,
        title: 'Зимнее Утро',
        link: '/story/2',
        page: 1,
        avatar: 'https://dic.academic.ru/pictures/enc_literature/i_430.jpg',
      },
    },

    {
      word: 'Sasha is sexy',
      trans: 'Sasha is a hot girl',
      date: Date.now,
      _id: 2,
      story: {
        _id: 2,
        title: 'Зимнее Утро',
        link: '/story/2',
        page: 2,
        avatar: 'https://dic.academic.ru/pictures/enc_literature/i_430.jpg',
      },
    },
  ],
};

const wordsReducer = (state: any = initState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default wordsReducer;
