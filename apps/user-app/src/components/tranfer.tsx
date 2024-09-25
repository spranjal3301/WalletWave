'use client'

import { useState } from 'react'
import { Search, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Avatar, AvatarFallback } from './ui/avatar'


// Mock function to simulate user search
const searchUsers = async (query: string) => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 500))
  return [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com' },
  ].filter(user => user.name.toLowerCase().includes(query.toLowerCase()))
}

// Mock function to simulate sending money
const sendMoney = async (userId: string, amount: number) => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return { success: true, message: `Successfully sent $${amount} to user ${userId}` }
}

type User = {
  id: string
  name: string
  email: string
}

export default function Transfer() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await searchUsers(searchQuery)
      setSearchResults(results)
    }
  }

  const handleSelectUser = (user: User) => {
    setSelectedUser(user)
    setSearchResults([])
    setSearchQuery('')
  }

  const handleSendMoney = async () => {
    if (selectedUser && amount) {
      const result = await sendMoney(selectedUser.id, parseFloat(amount))
      setMessage(result.message)
      setSelectedUser(null)
      setAmount('')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Send Money</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            
            {searchResults.length > 0 && (
              <Card>
                <CardContent className="p-2">
                  {searchResults.map(user => (
                    <div
                      key={user.id}
                      className="flex items-center space-x-2 p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSelectUser(user)}
                    >
                      <Avatar>
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
            
            {selectedUser && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Avatar>
                      <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{selectedUser.name}</div>
                      <div className="text-sm text-gray-500">{selectedUser.email}</div>
                    </div>
                  </div>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mb-4"
                  />
                  <Button onClick={handleSendMoney} className="w-full">
                    Send Money
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {message && (
              <div className="text-green-600 text-center">{message}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}