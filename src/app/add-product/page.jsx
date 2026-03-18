import { Suspense } from "react"
import AddProduct from "./AddProduct"

export default function AddProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddProduct />
    </Suspense>
  )
}