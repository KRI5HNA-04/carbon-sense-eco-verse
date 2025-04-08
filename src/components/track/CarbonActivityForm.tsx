
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
      { value: 'car', label: 'Car Trip' },
      { value: 'bus', label: 'Bus Journey' },
      { value: 'train', label: 'Train Journey' },
      { value: 'flight', label: 'Flight' },
      { value: 'bike', label: 'Cycling' },
    ]
  },
  {
    value: 'home',
    label: 'Home Energy',
    icon: <Home className="mr-2 h-4 w-4" />,
    activities: [
      { value: 'heating', label: 'Heating' },
      { value: 'cooling', label: 'Air Conditioning' },
      { value: 'electricity', label: 'Electricity Usage' },
      { value: 'water', label: 'Water Usage' },
    ]
  },
  {
    value: 'digital',
    label: 'Digital Activities',
    icon: <Laptop className="mr-2 h-4 w-4" />,
    activities: [
      { value: 'streaming', label: 'Video Streaming' },
      { value: 'browsing', label: 'Web Browsing' },
      { value: 'email', label: 'Email Usage' },
      { value: 'cloud', label: 'Cloud Storage' },
    ]
  },
  {
    value: 'food',
    label: 'Food & Drink',
    icon: <Utensils className="mr-2 h-4 w-4" />,
    activities: [
      { value: 'meal', label: 'Meal' },
      { value: 'beverage', label: 'Beverage' },
      { value: 'groceries', label: 'Grocery Shopping' },
    ]
  },
  {
    value: 'shopping',
    label: 'Shopping',
    icon: <ShoppingBag className="mr-2 h-4 w-4" />,
    activities: [
      { value: 'clothes', label: 'Clothing' },
      { value: 'electronics', label: 'Electronics' },
      { value: 'household', label: 'Household Items' },
      { value: 'other', label: 'Other Purchases' },
    ]
  }
];

const CarbonActivityForm = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const form = useForm({
    defaultValues: {
      category: '',
      activity: '',
      amount: '',
      unit: '',
      notes: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    toast({
      title: "Activity Recorded",
      description: "Your carbon activity has been logged successfully.",
      duration: 3000,
    });
    form.reset();
    setSelectedCategory(null);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    form.setValue('activity', '');
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
      </CardContent>
    </Card>
  );
};

export default CarbonActivityForm;
