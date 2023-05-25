type TaskItemStatusType = 'PENDING' | 'COMPLETED'

type TaskItemType = {
  id: string
  name: string
  createdAt: Date
  status: TaskItemStatusType
}