import html2canvas from "html2canvas";
import AgendaSemanal from "../../components/AgendaSemanal";
import { Download } from "../../components/Icon";
import { Button } from "@joana23a/styled-lib";

export default function Reservas () {

  const handleExport = async () => {
    const target = document.getElementById("agenda-container");
    if (!target) return;

    const canvas = await html2canvas(target, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imgData;
    link.download = "agenda-semanal.png";
    link.click();
  };


  return (
 <div className="w-full h-full flex flex-col items-center p-4">
      <div className="flex justify-end w-full mb-4">
        <Button
  variant="minimal"
  onClick={handleExport}
  className=" flex justify-center items-center w-[250px] h-[50px] "
>
  <Download className="w-8 h-5 mr-4" />
  Exportar
</Button>

      </div>

      <div id="agenda-container" className="w-full">
        <AgendaSemanal />
      </div>
    </div>
)
}