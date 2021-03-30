import React, { useState } from 'react';
import { Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { navStrings } from './Strings';
import LanguageSelector from './LanguageSelector';
import DifficultySelector from './DifficultySelector';

const NavDrawer = (props: any) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div>
      <MenuOutlined onClick={showDrawer}></MenuOutlined>
      <Drawer
        title={navStrings.set}
        placement='right'
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <LanguageSelector />
        <DifficultySelector />
      </Drawer>
    </div>
  );
};

export default NavDrawer;
