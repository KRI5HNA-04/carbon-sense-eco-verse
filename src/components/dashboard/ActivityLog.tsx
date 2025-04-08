
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Car, Home, Laptop, ShoppingBag, Coffee, Utensils } from 'lucide-react';

const activities = [
  {
    id: 1,
    activity: 'Car trip to office',
    emissions: 4.2,
    category: 'Transport',
    time: '8:30 AM',
    icon: <Car className="h-4 w-4" />,
    iconBg: 'bg-cs-blue-100 text-cs-blue-600 dark:bg-cs-blue-800/30 dark:text-cs-blue-400',
  },
  {
    id: 2,
    activity: 'Laptop usage (4 hours)',
    emissions: 0.15,
    category: 'Digital',
    time: '9:15 AM',
    icon: <Laptop className="h-4 w-4" />,
    iconBg: 'bg-cs-green-100 text-cs-green-600 dark:bg-cs-green-800/30 dark:text-cs-green-400',
  },
  {
    id: 3,
    activity: 'Coffee from local cafe',
    emissions: 0.35,
    category: 'Food',
    time: '10:30 AM',
    icon: <Coffee className="h-4 w-4" />,
    iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  },
  {
    id: 4,
    activity: 'Lunch (vegetarian)',
    emissions: 0.5,
    category: 'Food',
    time: '1:00 PM',
    icon: <Utensils className="h-4 w-4" />,
    iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  },
  {
    id: 5,
    activity: 'Ordered new headphones',
    emissions: 5.3,
    category: 'Shopping',
    time: '3:45 PM',
    icon: <ShoppingBag className="h-4 w-4" />,
    iconBg: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
  },
  {
    id: 6,
    activity: 'Home heating (2 hours)',
    emissions: 1.8,
    category: 'Home',
    time: '7:30 PM',
    icon: <Home className="h-4 w-4" />,
    iconBg: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  },
];

const ActivityLog = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Activities</CardTitle>
        <CardDescription>Track your daily carbon impact</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className={`p-2 rounded-full mr-4 ${activity.iconBg}`}>
                {activity.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-sm">{activity.activity}</p>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{activity.category}</span>
                  <span className="text-xs font-medium">{activity.emissions} kgCO₂e</span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full">
                  <div 
                    className="h-1 bg-gradient-to-r from-cs-green-500 to-cs-blue-400 rounded-full"
                    style={{ width: `${Math.min(100, (activity.emissions / 8) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityLog;
