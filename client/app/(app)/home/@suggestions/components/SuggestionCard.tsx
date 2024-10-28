"use client"
import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export interface UserSuggestion {
  id: string
  name: string
  username: string
  avatarUrl: string
}

interface SuggestionCardProps {
  user: UserSuggestion
}

export default function SuggestionCard({ user }: SuggestionCardProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing)
    // Here you would typically make an API call to follow/unfollow the user
    console.log(`${isFollowing ? 'Unfollowed' : 'Followed'} ${user.username}`)
  }

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="size-12">
              <AvatarImage src={user.avatarUrl} alt={`${user.name}'s avatar`} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-sm font-semibold">{user.name}</h3>
              <p className="text-sm">@{user.username}</p>
            </div>
          </div>
          <Button
            variant={isFollowing ? "secondary" : "default"}
            size="sm"
            onClick={handleFollowClick}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}