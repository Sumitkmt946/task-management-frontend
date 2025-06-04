import { Component } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"

interface Task {
  id: string
  date: string
  entityName: string
  taskType: "Call" | "Meeting" | "Video Call"
  time: string
  contactPerson: string
  note?: string
  status: "Open" | "Closed"
  phoneNumber?: string
}

@Component({
  selector: "app-task-management",
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: "./task-management.component.html",
  styleUrls: ["./task-management.component.css"],
})
export class TaskManagementComponent {
  tasks: Task[] = [
    {
      id: "1",
      date: "12/03/2025",
      entityName: "Java Company",
      taskType: "Call",
      time: "10:19 AM",
      contactPerson: "Suresh",
      note: "Follow up on proposal",
      status: "Open",
      phoneNumber: "+9194567890",
    },
    {
      id: "2",
      date: "13/03/2025",
      entityName: "Zara Corp",
      taskType: "Meeting",
      time: "2:10 PM",
      contactPerson: "Raju Kumar",
      status: "Closed",
      phoneNumber: "+9187654321",
    },
    {
      id: "3",
      date: "14/03/2025",
      entityName: "DEF Ltd",
      taskType: "Video Call",
      time: "11:38 AM",
      contactPerson: "Mike Johnson",
      status: "Open",
      phoneNumber: "+9192334455",
    },
    {
      id: "4",
      date: "18/03/2025",
      entityName: "PVD Lt",
      taskType: "Video Call",
      time: "11:55 AM",
      contactPerson: "Jonsen",
      status: "Open",
      phoneNumber: "+9190334458",
    },
    {
      id: "5",
      date: "24/03/2025",
      entityName: "Zidio",
      taskType: "Video Call",
      time: "12:38 AM",
      contactPerson: "Mikesh",
      status: "Open",
      phoneNumber: "+9192334490",
    },
    {
      id: "6",
      date: "29/05/2025",
      entityName: "Judui Pvt",
      taskType: "Video Call",
      time: "11:08 AM",
      contactPerson: "Mike Jone",
      status: "Closed",
      phoneNumber: "+9192334978",
    },
  ]

  filteredTasks: Task[] = [...this.tasks]
  selectedTaskType = "All"
  searchTerm = ""
  showTaskTypeDropdown = false
  showNewTaskModal = false
  showOptionsFor: string | null = null
  editingTask: Task | null = null

  newTask: Task = {
    id: "",
    date: "",
    entityName: "",
    taskType: "Call",
    time: "",
    contactPerson: "",
    note: "",
    status: "Open",
    phoneNumber: "",
  }

  openNewTaskModal() {
    this.showNewTaskModal = true
    this.editingTask = null
    this.resetNewTask()
  }

  closeNewTaskModal() {
    this.showNewTaskModal = false
    this.editingTask = null
    this.resetNewTask()
  }

  resetNewTask() {
    this.newTask = {
      id: "",
      date: "",
      entityName: "",
      taskType: "Call",
      time: "",
      contactPerson: "",
      note: "",
      status: "Open",
      phoneNumber: "",
    }
  }

  saveTask() {
    if (this.editingTask) {
      const index = this.tasks.findIndex((t) => t.id === this.editingTask!.id)
      if (index !== -1) {
        this.tasks[index] = { ...this.newTask }
      }
    } else {
      const newTask: Task = {
        ...this.newTask,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString("en-GB"),
      }
      this.tasks.push(newTask)
    }
    this.applyFilters()
    this.closeNewTaskModal()
  }

  editTask(task: Task) {
    this.editingTask = task
    this.newTask = { ...task }
    this.showNewTaskModal = true
    this.showOptionsFor = null
  }

  duplicateTask(task: Task) {
    const duplicatedTask: Task = {
      ...task,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-GB"),
    }
    this.tasks.push(duplicatedTask)
    this.applyFilters()
    this.showOptionsFor = null
  }

  changeStatus(task: Task) {
    task.status = task.status === "Open" ? "Closed" : "Open"
    this.applyFilters()
    this.showOptionsFor = null
  }

  addNote(task: Task) {
    const note = prompt("Add a note:")
    if (note) {
      task.note = note
    }
  }

  toggleTaskTypeDropdown() {
    this.showTaskTypeDropdown = !this.showTaskTypeDropdown
  }

  setTaskType(taskType: string) {
    this.selectedTaskType = taskType
    this.showTaskTypeDropdown = false
    this.applyFilters()
  }

  

  toggleOptions(taskId: string) {
    this.showOptionsFor = this.showOptionsFor === taskId ? null : taskId
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter((task) => {
      const matchesTaskType = this.selectedTaskType === "All" || task.taskType === this.selectedTaskType
      const matchesSearch =
        !this.searchTerm ||
        task.entityName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        task.contactPerson.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (task.note && task.note.toLowerCase().includes(this.searchTerm.toLowerCase()))

      return matchesTaskType && matchesSearch
    })
  }
}
