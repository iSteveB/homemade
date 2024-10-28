import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface TrendingCategory {
  name: string
  postCount: number
}

interface TrendingCardProps {
  categories: TrendingCategory[]
}

export default function TrendingCard({ categories }: TrendingCardProps) {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Trending</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index} className="flex items-center justify-between border-t border-stone-200 pb-8 pt-1">
              <Link href={`/category/${category.name.toLowerCase()}`} passHref>
                <Badge
                  variant="secondary"
                  className="cursor-pointer text-sm font-medium transition-colors hover:bg-primary/80 hover:text-neutral"
                >
                  #{category.name}
                </Badge>
              </Link>
              <span className="text-xs">{category.postCount} posts</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}