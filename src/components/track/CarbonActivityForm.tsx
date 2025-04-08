
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Car, Home, Laptop, ShoppingBag, Utensils } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const categories = [
  {
    value: 'transport',
    label: 'Transportation',
    icon: <Car className="mr-2 h-4 w-4" />,
    activities: [
      { value: 'car', label: 'Car Trip', factor: 0.21 }, // kg CO2e per km
      { value: 'bus', label: 'Bus Journey', factor: 0.09 }, // kg CO2e per km
      { value: 'train', label: 'Train Journey', factor: 0.04 }, // kg CO2e per km
      { value: 'flight', label: 'Flight', factor: 0.24 }, // kg CO2e per km
      { value: 'bike', label: 'Cycling', factor: 0.0 }, // kg CO2e per km
    ]
  },
  {
    value: 'home',
    label: 'Home Energy',
    icon: <Home className="mr-2 h-4 w-4" />,
    activities: [
      { value: 'heating', label: 'Heating', factor: 0.5 }, // kg CO2e per hour
      { value: 'cooling', label: 'Air Conditioning', factor: 0.4 }, // kg CO2e per hour
      { value: 'electricity', label: 'Electricity Usage', factor: 0.5 }, // kg CO2e per kWh
      { value: 'water', label: 'Water Usage', factor: 0.2 }, // kg CO2e per liter
    ]
  },
  {
    value: 'digital',
    label: 'Digital Activities',
    icon: <Laptop className="mr-2 h-4 w-4" />,
    activities: [
      { value: 'streaming', label: 'Video Streaming', factor: 0.08 }, // kg CO2e per hour
      { value: 'browsing', label: 'Web Browsing', factor: 0.02 }, // kg CO2e per hour
      { value: 'email', label: 'Email Usage', factor: 0.004 }, // kg CO2e per email
      { value: 'cloud', label: 'Cloud Storage', factor: 0.003 }, // kg CO2e per GB
    ]
  },
  {
    value: 'food',
    label: 'Food & Drink',
    icon: <Utensils className="mr-2 h-4 w-4" />,
    activities: [
      { value: 'meal', label: 'Meal', factor: 2.5 }, // kg CO2e per meal (average)
      { value: 'beverage', label: 'Beverage', factor: 0.2 }, // kg CO2e per beverage
      { value: 'groceries', label: 'Grocery Shopping', factor: 0.6 }, // kg CO2e per kg
    ]
  },
  {
    value: 'shopping',
    label: 'Shopping',
    icon: <ShoppingBag className="mr-2 h-4 w-4" />,
    activities: [
      { value: 'clothes', label: 'Clothing', factor: 10 }, // kg CO2e per item
      { value: 'electronics', label: 'Electronics', factor: 25 }, // kg CO2e per item
      { value: 'household', label: 'Household Items', factor: 8 }, // kg CO2e per item
      { value: 'other', label: 'Other Purchases', factor: 5 }, // kg CO2e per item
    ]
  }
];

interface FormValues {
  category: string;
  activity: string;
  amount: string;
  unit: string;
  notes: string;
}

const CarbonActivityForm = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [calculatedEmission, setCalculatedEmission] = useState<number | null>(null);
  
  const form = useForm<FormValues>({
    defaultValues: {
      category: '',
      activity: '',
      amount: '',
      unit: '',
      notes: '',
    },
  });

  const calculateEmission = (data: FormValues) => {
    if (!data.category || !data.activity || !data.amount) return 0;
    
    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) return 0;
    
    // Find the activity to get its emission factor
    const category = categories.find(c => c.value === data.category);
    if (!category) return 0;
    
    const activity = category.activities.find(a => a.value === data.activity);
    if (!activity) return 0;
    
    // Calculate emission based on activity factor and amount
    return amount * activity.factor;
  };

  const onSubmit = (data: FormValues) => {
    const emission = calculateEmission(data);
    setCalculatedEmission(emission);
    
    console.log('Form submitted:', data, 'Calculated emission:', emission);
    
    toast({
      title: "Activity Recorded",
      description: `Your carbon footprint for this activity is ${emission.toFixed(2)} kgCO₂e`,
      duration: 5000,
    });
    
    // Don't reset form if user wants to see the result
    // form.reset();
    // setSelectedCategory(null);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    form.setValue('activity', '');
    setCalculatedEmission(null);
  };

  const selectedCategoryData = categories.find(c => c.value === selectedCategory);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Track Carbon Activity</CardTitle>
        <CardDescription>Record a new activity to calculate its carbon impact</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleCategoryChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          <div className="flex items-center">
                            {category.icon}
                            {category.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedCategory && (
              <FormField
                control={form.control}
                name="activity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Activity Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedCategoryData?.activities.map((activity) => (
                          <SelectItem key={activity.value} value={activity.value}>
                            {activity.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g. 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="km">Kilometers</SelectItem>
                        <SelectItem value="hours">Hours</SelectItem>
                        <SelectItem value="kWh">Kilowatt-hours</SelectItem>
                        <SelectItem value="litres">Litres</SelectItem>
                        <SelectItem value="kg">Kilograms</SelectItem>
                        <SelectItem value="items">Items</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Add any relevant details" {...field} />
                  </FormControl>
                  <FormDescription>
                    Add additional context about this activity if needed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Calculate & Save Activity</Button>
          </form>
        </Form>
        
        {calculatedEmission !== null && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
            <h3 className="font-medium mb-2">Carbon Footprint Impact</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Estimated emissions:</span>
              <span className="font-semibold text-lg">{calculatedEmission.toFixed(2)} kgCO₂e</span>
            </div>
            <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cs-green-500 to-cs-blue-400 rounded-full"
                style={{ width: `${Math.min(100, (calculatedEmission / 20) * 100)}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CarbonActivityForm;
