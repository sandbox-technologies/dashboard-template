import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'

interface FileDropzoneProps {
  onFilesDropped?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  className?: string
}

export function FileDropzone({
  onFilesDropped,
  accept,
  multiple = true,
  className,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const droppedFiles = Array.from(e.dataTransfer.files)
      const newFiles = multiple ? droppedFiles : [droppedFiles[0]]
      setFiles(newFiles)
      onFilesDropped?.(newFiles)
    },
    [multiple, onFilesDropped]
  )

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files)
        setFiles(selectedFiles)
        onFilesDropped?.(selectedFiles)
      }
    },
    [onFilesDropped]
  )

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.filter((_, i) => i !== index)
      setFiles(newFiles)
      onFilesDropped?.(newFiles)
    },
    [files, onFilesDropped]
  )

  return (
    <div className={cn('space-y-4', className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-muted-foreground/50'
        )}
      >
        <input
          type='file'
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className='absolute inset-0 cursor-pointer opacity-0'
        />
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          className={cn(
            'mb-2 h-10 w-10',
            isDragging ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
          <polyline points='17 8 12 3 7 8' />
          <line x1='12' x2='12' y1='3' y2='15' />
        </svg>
        <p className='text-muted-foreground text-sm'>
          {isDragging ? (
            <span className='text-primary font-medium'>Drop files here</span>
          ) : (
            <>
              <span className='font-medium'>Click to upload</span> or drag and
              drop
            </>
          )}
        </p>
        <p className='text-muted-foreground mt-1 text-xs'>
          {accept ? `Accepted: ${accept}` : 'Any file type'}
        </p>
      </div>

      {files.length > 0 && (
        <div className='space-y-2'>
          <p className='text-sm font-medium'>
            {files.length} file{files.length !== 1 ? 's' : ''} selected
          </p>
          <ul className='space-y-1'>
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className='bg-muted flex items-center justify-between rounded-md px-3 py-2 text-sm'
              >
                <span className='truncate'>{file.name}</span>
                <button
                  type='button'
                  onClick={() => removeFile(index)}
                  className='text-muted-foreground hover:text-foreground ml-2 shrink-0'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4'
                  >
                    <line x1='18' x2='6' y1='6' y2='18' />
                    <line x1='6' x2='18' y1='6' y2='18' />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
