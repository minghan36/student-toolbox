"use client"

import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"

export default function DatabaseExample() {
  const session = useSession()

  const [animal, setAnimal] = useState("")
  const [response, setResponse] = useState("")

  const username = session?.data?.user?.name

  /**
   * Handles the form submission to update the user's favourite animal
   *
   * @param {FormEvent} event
   */
  async function handleUpdateAnimal(event) {
    event.preventDefault()
    const res = await fetch(`/api/user/${username}/animal`, {
      method: "POST",
      body: JSON.stringify({ animal }),
    })
    const data = await res.json()
    setResponse(data.animal || data.error)
  }

  /**
   * Handles the form submission to fetch the user's favourite animal
   *
   * @param {FormEvent} event
   */
  async function handleFetchAnimal(event) {
    event.preventDefault()
    const res = await fetch(`/api/user/${username}/animal`)
    const data = await res.json()
    setResponse(data.animal || data.error)
  }

  if (!session?.data?.user) {
    return null
  }

  return (
    <div style={{ marginLeft: "120px" }}>
      <form onSubmit={handleUpdateAnimal}>
        <label>
          <span>What&apos;s your favourite animal?</span>
          <input
            type="text"
            name="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
          />
        </label>
        <button>Update</button>
      </form>
      <form onSubmit={handleFetchAnimal}>
        <button>Fetch animal</button>
      </form>

      {response && <p>{response}</p>}
    </div>
  )
}
