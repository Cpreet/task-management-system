import LogoAsset from "../assets/logo.svg"
import { useTheme } from "./ThemeProvider"
import { Button } from "./ui/button"

const Logo = () => {
  const { theme, setTheme } = useTheme()
  return (
    <Button variant={"ghost"} size="icon" onClick={
      () => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <img src={LogoAsset} />
    </Button>
  )
}

export default Logo
