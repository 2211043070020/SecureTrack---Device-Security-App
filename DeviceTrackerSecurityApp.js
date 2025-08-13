import React, { useState, useEffect } from 'react';
import { Smartphone, MapPin, Camera, Shield, AlertTriangle, Settings, Eye, Lock, Unlock, Navigation, Clock, User, Bell } from 'lucide-react';

const DeviceTrackerApp = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [deviceLocation, setDeviceLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [lastSeen, setLastSeen] = useState('2 minutes ago');
  const [batteryLevel, setBatteryLevel] = useState(73);
  const [securityAlerts, setSecurityAlerts] = useState([
    { id: 1, type: 'unlock_attempt', time: '14:30', location: 'Times Square, NY', status: 'blocked' },
    { id: 2, type: 'location_change', time: '14:15', location: 'Central Park, NY', status: 'tracked' }
  ]);
  const [capturedPhotos, setCapturedPhotos] = useState([
    { id: 1, time: '14:30', type: 'front_camera', thumbnail: '/api/placeholder/60/60' },
    { id: 2, time: '14:25', type: 'back_camera', thumbnail: '/api/placeholder/60/60' }
  ]);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [deviceStatus, setDeviceStatus] = useState('safe'); // safe, stolen, suspicious

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastSeen(`${Math.floor(Math.random() * 5) + 1} minutes ago`);
      setBatteryLevel(prev => Math.max(10, prev - Math.random() * 2));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleTracking = () => {
    setIsTracking(!isTracking);
    if (!isTracking) {
      setDeviceStatus('stolen');
    } else {
      setDeviceStatus('safe');
    }
  };

  const sendWipeCommand = () => {
    if (window.confirm('Are you sure you want to wipe all data? This action cannot be undone.')) {
      alert('Remote wipe command sent to device. All data will be erased.');
    }
  };

  const lockDevice = () => {
    alert('Device locked remotely with emergency PIN.');
  };

  const soundAlarm = () => {
    alert('Alarm activated on device at maximum volume.');
  };

  const showMessage = () => {
    const message = prompt('Enter message to display on device:');
    if (message) {
      alert(`Message "${message}" will be displayed on device screen.`);
    }
  };

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Device Status Card */}
      <div className={`rounded-lg p-6 ${
        deviceStatus === 'safe' ? 'bg-green-50 border border-green-200' :
        deviceStatus === 'stolen' ? 'bg-red-50 border border-red-200' :
        'bg-yellow-50 border border-yellow-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Smartphone className={`h-8 w-8 ${
              deviceStatus === 'safe' ? 'text-green-600' :
              deviceStatus === 'stolen' ? 'text-red-600' :
              'text-yellow-600'
            }`} />
            <div>
              <h2 className="text-xl font-bold text-gray-900">iPhone 14 Pro</h2>
              <p className={`text-sm ${
                deviceStatus === 'safe' ? 'text-green-600' :
                deviceStatus === 'stolen' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {deviceStatus === 'safe' ? 'Device Safe' :
                 deviceStatus === 'stolen' ? 'STOLEN - Tracking Active' :
                 'Suspicious Activity Detected'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleTracking}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              isTracking 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isTracking ? 'Stop Tracking' : 'Mark as Stolen'}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <MapPin className="h-5 w-5 text-gray-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Last Seen</p>
            <p className="text-xs font-medium">{lastSeen}</p>
          </div>
          <div className="text-center">
            <div className="h-5 w-5 bg-green-500 rounded mx-auto mb-1"></div>
            <p className="text-sm text-gray-600">Battery</p>
            <p className="text-xs font-medium">{Math.round(batteryLevel)}%</p>
          </div>
          <div className="text-center">
            <Navigation className="h-5 w-5 text-gray-600 mx-auto mb-1" />
            <p className="text-sm text-gray-600">Location</p>
            <p className="text-xs font-medium">GPS Active</p>
          </div>
        </div>
      </div>

      {/* Live Location */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Live Location</h3>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600">Live</span>
          </div>
        </div>
        
        <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Manhattan, New York</p>
            <p className="text-xs text-gray-600">40.7128° N, 74.0060° W</p>
            <p className="text-xs text-gray-500 mt-1">Accuracy: ±5 meters</p>
          </div>
        </div>

        <div className="flex space-x-3">
          <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            View on Map
          </button>
          <button className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
            Share Location
          </button>
        </div>
      </div>

      {/* Security Photos */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Security Photos</h3>
          <Camera className="h-5 w-5 text-gray-600" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {capturedPhotos.map((photo) => (
            <div key={photo.id} className="border rounded-lg p-3">
              <div className="bg-gray-200 rounded h-20 mb-2 flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-500" />
              </div>
              <p className="text-xs font-medium text-gray-900 capitalize">{photo.type.replace('_', ' ')}</p>
              <p className="text-xs text-gray-600">Captured at {photo.time}</p>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
          View All Photos
        </button>
      </div>

      {/* Emergency Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Actions</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={lockDevice}
            className="flex items-center justify-center space-x-2 bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <Lock className="h-4 w-4" />
            <span className="text-sm font-medium">Lock Device</span>
          </button>
          
          <button 
            onClick={soundAlarm}
            className="flex items-center justify-center space-x-2 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="text-sm font-medium">Sound Alarm</span>
          </button>
          
          <button 
            onClick={showMessage}
            className="flex items-center justify-center space-x-2 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Eye className="h-4 w-4" />
            <span className="text-sm font-medium">Show Message</span>
          </button>
          
          <button
            onClick={sendWipeCommand}
            className="flex items-center justify-center space-x-2 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm font-medium">Wipe Data</span>
          </button>
        </div>
      </div>
    </div>
  );

  const SecurityAlerts = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">Security Alerts</h2>
      
      {securityAlerts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
          <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No security alerts</p>
          <p className="text-sm text-gray-500">Your device is secure</p>
        </div>
      ) : (
        securityAlerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  alert.type === 'unlock_attempt' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {alert.type === 'unlock_attempt' ? (
                    <Unlock className="h-4 w-4 text-red-600" />
                  ) : (
                    <Navigation className="h-4 w-4 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {alert.type === 'unlock_attempt' ? 'Failed Unlock Attempt' : 'Location Changed'}
                  </p>
                  <p className="text-sm text-gray-600">{alert.location}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                alert.status === 'blocked' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {alert.status}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const AppSettings = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Settings</h2>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Auto Photo Capture</p>
              <p className="text-sm text-gray-600">Take photos on failed unlock attempts</p>
            </div>
            <div className="bg-blue-600 rounded-full w-12 h-6 flex items-center justify-end px-1 cursor-pointer">
              <div className="bg-white w-4 h-4 rounded-full transition-transform"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Location Tracking</p>
              <p className="text-sm text-gray-600">Continuously track device location</p>
            </div>
            <div className="bg-blue-600 rounded-full w-12 h-6 flex items-center justify-end px-1 cursor-pointer">
              <div className="bg-white w-4 h-4 rounded-full transition-transform"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Stealth Mode</p>
              <p className="text-sm text-gray-600">Hide app from app drawer</p>
            </div>
            <div className="bg-gray-300 rounded-full w-12 h-6 flex items-center px-1 cursor-pointer">
              <div className="bg-white w-4 h-4 rounded-full transition-transform"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">John Doe</p>
                <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Edit</button>
          </div>
          
          <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 transition-colors">
            + Add Emergency Contact
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p><span className="font-medium">Version:</span> 1.0.0</p>
          <p><span className="font-medium">Last Updated:</span> {new Date().toLocaleDateString()}</p>
          <p><span className="font-medium">Developer:</span> SecureTrack Team</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">SecureTrack</h1>
                <p className="text-sm text-gray-600">Device Security</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
              deviceStatus === 'safe' ? 'bg-green-100 text-green-800' :
              deviceStatus === 'stolen' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {deviceStatus.toUpperCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {currentTab === 'dashboard' && <Dashboard />}
        {currentTab === 'alerts' && <SecurityAlerts />}
        {currentTab === 'settings' && <AppSettings />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-around py-2">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                currentTab === 'dashboard' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Smartphone className="h-5 w-5 mb-1" />
              <span className="text-xs">Dashboard</span>
            </button>
            
            <button
              onClick={() => setCurrentTab('alerts')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors relative ${
                currentTab === 'alerts' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <AlertTriangle className="h-5 w-5 mb-1" />
              <span className="text-xs">Alerts</span>
              {securityAlerts.length > 0 && (
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
              )}
            </button>
            
            <button
              onClick={() => setCurrentTab('settings')}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                currentTab === 'settings' ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Settings className="h-5 w-5 mb-1" />
              <span className="text-xs">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceTrackerApp;
