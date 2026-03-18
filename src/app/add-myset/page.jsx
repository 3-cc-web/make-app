import { Suspense } from "react"
import AddMyset from "./AddMyset"

export default function AddMysetPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddMyset />
    </Suspense>
  )
}