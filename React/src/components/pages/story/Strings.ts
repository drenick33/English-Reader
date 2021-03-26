import LocalizedStrings from 'react-localization';

export const storyStrings = new LocalizedStrings({
  en: {
    show: 'Click here to show translation',
    save: 'Save',
    noUserTitle: 'Warning',
    noUserDesc: 'Please log in to save words',
    wordSucTitle: 'Saved Word',
    wordErrTitle: 'Failed to save word',
    play: 'Play',
    stop: 'Stop',
  },
  zh: {
    show: '点击此处显示翻译',
    save: '保存',
    noUserTitle: '警告',
    noUserDesc: '请登录以保存单词',
    wordSucTitle: '已保存单词',
    wordErrTitle: '无法保存单词',
    play: '再生',
    stop: '停',
  },
});

export default storyStrings;
