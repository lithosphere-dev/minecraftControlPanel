import { Alert } from "@/components/layout/alert"
import { InputPassword } from "@/components/layout/input"

export default function Ftp() {
  return (
    <main className="h-screen w-full flex flex-col gap-4 p-4">
      <div>
        <h1 className="font-bold text-xl">FTP</h1>
        <p className="italic text-sm text-zinc-500">The ftp server runs on vsftpd daemon</p>
      </div>
      <div className="w-full flex flex-col gap-1">
        <h2 className="font-semibold">FTP connection</h2>
        <div className="flex flex-col gap-2">
          <div>
            <h2 className="text-sm w-24">Username:</h2>
            <InputPassword value="username" />
          </div>
          <div>
            <h2 className="text-sm w-24">Password:</h2>
            <InputPassword value="password" />
          </div>
          <div>
            <h2 className="text-sm w-24">Host:</h2>
            <InputPassword value="host" />
          </div>
          <div>
            <h2 className="text-sm w-24">Port:</h2>
            <InputPassword value="21" />
          </div>
        </div>
      </div>
      <Alert type={"danger"} title={"title"} description={"description"} />
    </main>
  )
}