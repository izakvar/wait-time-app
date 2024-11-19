import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock, Users } from 'lucide-react';

const WaitTimesDisplay = () => {
  const [waitTimes, setWaitTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWaitTimes = async () => {
      try {
        const response = await fetch('/api/wait-times');
        const data = await response.json();
        setWaitTimes(data);
        setLoading(false);
      } catch (err) {
        setError('無法取得資料，請稍後再試');
        setLoading(false);
      }
    };

    fetchWaitTimes();
    const interval = setInterval(fetchWaitTimes, 60000); // 每分鐘更新一次
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">載入中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl text-center">診所等候人數</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="text-blue-500" />
                    <span className="font-medium">維新眼科</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-600">
                    {waitTimes?.wroomWait || '0'} 人
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="text-green-500" />
                    <span className="font-medium">美而美診所</span>
                  </div>
                  <span className="text-2xl font-bold text-green-600">
                    {waitTimes?.mainpiWait || '0'} 人
                  </span>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500 mt-4">
                <Clock className="inline-block w-4 h-4 mr-1" />
                最後更新: {waitTimes?.timestamp || ''}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaitTimesDisplay;
