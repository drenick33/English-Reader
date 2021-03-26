import React from 'react';
import { Pagination, Menu } from 'antd';
import { PlayCircleTwoTone } from '@ant-design/icons';

const StoryFoot = (props: any) => {
  return (
    <footer
      style={{
        backgroundColor: 'green',
      }}
    >
      <Menu theme="light" mode="horizontal">
        <Menu.Item key="1" style={{ float: 'right', paddingTop: '12px' }}>
          <Pagination
            simple
            onChange={props.handlePageChange}
            defaultCurrent={props.page}
            total={props.pageCount * 10}
          />
        </Menu.Item>
        <Menu.Item key="3" style={{ marginLeft: '42px', paddingTop: '6px' }}>
          <PlayCircleTwoTone twoToneColor="#1DA57A" style={{ fontSize: 24 }} />
        </Menu.Item>
      </Menu>
    </footer>
  );
};

export default StoryFoot;
