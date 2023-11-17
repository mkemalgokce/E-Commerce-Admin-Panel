import { FC, useState } from "react"
import ImgCrop from "antd-img-crop"
import { Upload, UploadFile } from "antd"
import { UploadChangeParam } from "antd/lib/upload"

import { UploadIcon } from "lucide-react"
import { Button } from "@/components/ui/button.tsx"
import { ServerConfig } from "@/config"

const getSrcFromFile = (file: File): Promise<string> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
  })
}

interface ImageUploadProps {
  onDataChange: (value: string) => void
  value: string[]
  disabled: boolean
  maxCount?: number
  listType?: "picture" | "picture-card" | "picture-circle"
}
const ImageUpload: FC<ImageUploadProps> = ({
  onDataChange,
  value,
  disabled,
  maxCount = 1,
  listType = "picture"
}) => {
  const uploadFiles: UploadFile[] = value.map((item, index) => ({
    uid: index.toString(),
    name: item,
    status: "done",
    url: item
  }))

  const [fileList, setFileList] = useState<UploadFile[]>(uploadFiles || [])

  const onChange = ({ fileList: newFiles }: UploadChangeParam<UploadFile>) => {
    setFileList(newFiles)
    if (newFiles[0]?.response?.path) {
      onDataChange(ServerConfig.baseURL + newFiles[0].response.path)
      console.log(
        "Image path:",
        ServerConfig.baseURL + newFiles[0].response.path
      )
    }
  }

  const onPreview = async (file: UploadFile) => {
    const src = file.url || (await getSrcFromFile(file.originFileObj as File))
    const imgWindow = window.open(src)

    if (imgWindow) {
      const image = new Image()
      image.src = src
      imgWindow.document.write(image.outerHTML)
    } else {
      window.location.href = src
    }
  }

  return (
    <div className="w-full">
      <ImgCrop aspect={2}>
        <Upload
          name="file"
          listType={listType}
          fileList={fileList}
          accept={"image/*"}
          action="http://localhost:4026/upload"
          onChange={onChange}
          onPreview={onPreview}
          rootClassName="w-full"
          maxCount={maxCount}
        >
          {fileList.length < maxCount && (
            <Button variant="outline" type="button" disabled={disabled}>
              <div className="flex items-center justify-center gap-x-2">
                <UploadIcon />
                Upload Image
              </div>
            </Button>
          )}
        </Upload>
      </ImgCrop>
    </div>
  )
}

export default ImageUpload
