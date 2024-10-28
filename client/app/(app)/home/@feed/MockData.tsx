export interface Post {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  timestamp: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

export const Mockdata: Post[] = [
  {
    id: '1',
    content: "Just made the most amazing homemade pizza! The secret is in the dough. Who wants the recipe? 🍕 #HomeCooking #PizzaNight",
    author: {
      name: "Emily Chen",
      avatar: "https://i.pravatar.cc/300",
      username: "@emilychef",
    },
    timestamp: "2024-10-05T18:49:00Z",
    image: "https://picsum.photos/550/405",
    likes: 127,
    comments: 43,
    shares: 12,
  },
  {
    id: '2',
    content: "Quick tip: Always pat your chicken dry before seasoning. It helps the spices stick better and gives you a crispier skin when cooking! #CookingTips #ChickenRecipes",
    author: {
      name: "Marcus Johnson",
      avatar: "https://i.pravatar.cc/300",
      username: "@chefjohnson",
    },
    timestamp: "2023-06-15T18:45:00",
    likes: 89,
    comments: 21,
    shares: 7,
  },
  {
    id: '3',
    content: "Experimenting with vegan desserts today. This chocolate avocado mousse is surprisingly creamy and delicious! Who said healthy can't be tasty? 🥑🍫 #VeganDesserts #HealthyTreats",
    author: {
      name: "Sophia Lee",
      avatar: "https://i.pravatar.cc/300",
      username: "@sophiabakes",
    },
    timestamp: "2023-06-15T10:15:00Z",
    image: "https://picsum.photos/605/400",
    likes: 215,
    comments: 67,
    shares: 31,
  },
  {
    id: '4',
    content: "Nothing beats the aroma of freshly baked bread in the morning. Here's my foolproof recipe for a crusty sourdough loaf. Let me know if you try it! 🍞 #Baking #Sourdough",
    author: {
      name: "David Miller",
      avatar: "https://i.pravatar.cc/300",
      username: "@breadmaster",
    },
    timestamp: "2023-06-14T22:00:00Z",
    likes: 176,
    comments: 52,
    shares: 18,
  },
  {
    id: '5',
    content: "Meal prep Sunday! Prepared a week's worth of healthy lunches in just 2 hours. It's all about planning and efficient cooking techniques. Who else is into meal prepping? #MealPrep #HealthyEating",
    author: {
      name: "Rachel Green",
      avatar: "https://i.pravatar.cc/300",
      username: "@rachelcooks",
    },
    timestamp: "2023-06-14T19:30:00Z",
    image: "https://picsum.photos/605/405",
    likes: 302,
    comments: 87,
    shares: 45,
  }
];