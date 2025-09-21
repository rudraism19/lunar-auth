import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';

interface CodeInputProps {
  length: number;
  onComplete: (code: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ length, onComplete }) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newCode.every((digit) => digit !== '')) {
      onComplete(newCode.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {code.map((digit, index) => (
        <Input
          key={index}
          type="text"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputRefs.current[index] = el!)}
          maxLength={1}
          className="w-12 h-12 text-center text-2xl font-mono tracking-wider"
        />
      ))}
    </div>
  );
};

export default CodeInput;
