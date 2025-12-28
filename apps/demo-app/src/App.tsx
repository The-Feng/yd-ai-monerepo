import { useState, useEffect } from 'react';
import { useImmer } from '@yd-hooks/core';
import { formatDate, formatNumber, formatFileSize, isValidEmail, setStorage, getStorage } from '@yd-libs/core';
import { Button, Input, Card } from '@yd-ui/core';
import './App.css';

interface UserInfo {
  name: string;
  email: string;
  count: number;
}

function App() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [userInfo, updateUserInfo] = useImmer<UserInfo>({
    name: 'YD User',
    email: '',
    count: 0,
  });

  // 从本地存储加载数据
  useEffect(() => {
    const savedData = getStorage<UserInfo>('userInfo');
    if (savedData) {
      updateUserInfo(savedData);
      setEmail(savedData.email || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value !== '' && !isValidEmail(value));
  };

  const handleSubmit = () => {
    if (isValidEmail(email)) {
      updateUserInfo((draft) => {
        draft.email = email;
        draft.count += 1;
      });
      // 保存到本地存储
      setStorage('userInfo', { ...userInfo, email, count: userInfo.count + 1 });
      alert('提交成功！');
    } else {
      setEmailError(true);
    }
  };

  const handleReset = () => {
    updateUserInfo((draft) => {
      draft.count = 0;
      draft.email = '';
    });
    setEmail('');
    setEmailError(false);
  };

  return (
    <div className="app">
      <div className="app-container">
        <h1 className="app-title">YD Monorepo Demo</h1>
        <p className="app-subtitle">演示 @yd-hooks、@yd-libs 和 @yd-ui 的使用</p>

        <div className="app-content">
          {/* 使用 @yd-ui 组件 */}
          <Card title="用户信息" hoverable className="demo-card">
            <div className="demo-section">
              <h3>当前用户信息</h3>
              <p>姓名: {userInfo.name}</p>
              <p>邮箱: {userInfo.email || '未设置'}</p>
              <p>操作次数: {formatNumber(userInfo.count)}</p>
              <p>最后更新: {formatDate(new Date())}</p>
            </div>
          </Card>

          <Card title="表单示例" hoverable className="demo-card">
            <div className="demo-section">
              <h3>邮箱验证</h3>
              <Input
                type="email"
                placeholder="请输入邮箱地址"
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                size="large"
                prefix={<span>📧</span>}
                style={{ marginBottom: '16px', width: '100%' }}
              />
              {emailError && (
                <p className="error-text">请输入有效的邮箱地址</p>
              )}
              <div className="button-group">
                <Button type="primary" onClick={handleSubmit}>
                  提交
                </Button>
                <Button onClick={handleReset}>重置</Button>
                <Button
                  type="dashed"
                  loading={false}
                  onClick={() => {
                    updateUserInfo((draft) => {
                      draft.count += 1;
                    });
                  }}
                >
                  增加计数
                </Button>
              </div>
            </div>
          </Card>

          <Card title="组件展示" hoverable className="demo-card">
            <div className="demo-section">
              <h3>Button 组件</h3>
              <div className="button-group">
                <Button type="primary">Primary</Button>
                <Button type="default">Default</Button>
                <Button type="dashed">Dashed</Button>
                <Button type="text">Text</Button>
                <Button type="link">Link</Button>
              </div>
              <div className="button-group" style={{ marginTop: '16px' }}>
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
              </div>
              <div className="button-group" style={{ marginTop: '16px' }}>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
              </div>
            </div>
          </Card>

          <Card title="工具函数示例" hoverable className="demo-card">
            <div className="demo-section">
              <h3>格式化函数</h3>
              <p>日期格式化: {formatDate(new Date(), 'YYYY-MM-DD')}</p>
              <p>数字格式化: {formatNumber(1234567.89, 2)}</p>
              <p>文件大小: {formatFileSize(1024 * 1024 * 5)}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;

