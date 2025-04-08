
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownIcon, ArrowUpIcon, Activity, Car, Home, ShoppingBag } from 'lucide-react';

const CarbonSummary = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Carbon Footprint</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">142 kgCO₂e</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-cs-green-500 inline-flex items-center">
              <ArrowDownIcon className="mr-1 h-3 w-3" />
              12%
            </span>{' '}
            from last month
          </p>
          <div className="mt-4 h-1 w-full bg-muted">
            <div className="h-1 bg-gradient-to-r from-cs-green-500 to-cs-blue-400" style={{ width: '75%' }} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">75% of your monthly target</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Transportation</CardTitle>
          <Car className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">68 kgCO₂e</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-destructive inline-flex items-center">
              <ArrowUpIcon className="mr-1 h-3 w-3" />
              8%
            </span>{' '}
            from last month
          </p>
          <div className="mt-4 h-1 w-full bg-muted">
            <div className="h-1 bg-gradient-to-r from-cs-green-500 to-cs-blue-400" style={{ width: '45%' }} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">45% of total emissions</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Home Energy</CardTitle>
          <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">53 kgCO₂e</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-cs-green-500 inline-flex items-center">
              <ArrowDownIcon className="mr-1 h-3 w-3" />
              15%
            </span>{' '}
            from last month
          </p>
          <div className="mt-4 h-1 w-full bg-muted">
            <div className="h-1 bg-gradient-to-r from-cs-green-500 to-cs-blue-400" style={{ width: '32%' }} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">32% of total emissions</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Purchases</CardTitle>
          <ShoppingBag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">21 kgCO₂e</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-cs-green-500 inline-flex items-center">
              <ArrowDownIcon className="mr-1 h-3 w-3" />
              5%
            </span>{' '}
            from last month
          </p>
          <div className="mt-4 h-1 w-full bg-muted">
            <div className="h-1 bg-gradient-to-r from-cs-green-500 to-cs-blue-400" style={{ width: '23%' }} />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">23% of total emissions</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarbonSummary;
