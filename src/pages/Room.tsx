import { useParams } from "react-router-dom";

import { Button } from "../components/Button";

import logoImg from '../assets/images/logo.svg'

import '../styles/room.scss'
import { RoomCode } from "../components/RoomCode";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";
import toast, { Toaster } from 'react-hot-toast';

type RoomParams = {
  id: string;
}

export function Room() {
  const { user } = useAuth()
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');

  const roomId = params.id;

  async function handleSendQuestion(event: FormEvent) {
    event?.preventDefault();

    if (newQuestion.trim() === '') {
      return toast('Você precisa inserir uma pergunta', {
        icon: '👀'
      })
    }

    if (!user) {
      throw toast.error('Você precisa estar logado!');
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswerer: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)
    setNewQuestion('')

    toast.success('Sua pergunta foi enviada com sucesso!')
  }

  return (
    <div id="page-room">
      <Toaster />
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Sala</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt="Avatar da conta do Google" />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            )}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}