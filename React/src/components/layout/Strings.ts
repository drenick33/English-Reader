import LocalizedStrings from 'react-localization';

export const navStrings = new LocalizedStrings({
  en: {
    set: 'Settings',
    lang: 'Select Language',
    reader: 'Reader',
    logout: 'Log Out',
    register: 'Register',
    login: 'Login',
    saved: 'Saved Words',
    custom: 'Custom Text',
    add: 'Add Story',
  },
  zh: {
    set: '设定',
    lang: '选择语言',
    reader: '读英',
    logout: '登出',
    register: '注册',
    login: '登录',
    saved: '我的单词',
    custom: '自订',
    add: '发布故事',
  },
});

export default navStrings;
