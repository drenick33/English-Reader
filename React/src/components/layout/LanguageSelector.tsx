import React, { useState, useEffect } from 'react';
import { Drawer, Select } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { navStrings } from './Strings';

const { Option } = Select;

const LanguageSelector = (props: any) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lang = localStorage.getItem('locale') || '';
    navStrings.setLanguage(lang);
  }, []);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const setLang = (lang: string) => {
    localStorage.setItem('locale', lang);
    window.location.reload();
  };

  return (
    <div>
      <p>{navStrings.lang}</p>
      <Select
        defaultValue={localStorage.getItem('locale') || ''}
        onSelect={(value: string) => setLang(value)}
      >
        <Option value='en'>English</Option>
        <Option value='zh'>中文</Option>
      </Select>
    </div>
  );
};

export default LanguageSelector;
