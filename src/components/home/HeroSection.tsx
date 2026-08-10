import { useEffect, useMemo, useRef, useState } from "react";
import { companyInfo } from "../../config/company";
import { zodiacSigns } from "../../data/zodiac";
import { ZodiacIcon } from "../brand/ZodiacIcon";
import { Trigram } from "./Trigram";

const CARD_CHANGE_DELAY = 4200;

const CARD_IMAGES = [
  { width: ["kor-mouse-front.jpg", "kor-mouse-back.jpg"], length: ["visit-mouse-front.jpg", "visit-mouse-back.jpg"] },
  { width: ["kor-cow-front.jpg", "kor-cow-back.jpg"], length: ["visit-cow-front.jpg", "visit-cow-back.jpg"] },
  { width: ["kor-tiger-front.jpg", "kor-tiger-back.jpg"], length: ["visit-tiger-front.jpg", "visit-tiger-back.jpg"] },
  { width: ["kor-rabbit-front.jpg", "kor-rabbit-back.jpg"], length: ["visit-rabbit-front.jpg", "visit-rabbit-back.jpg"] },
  { width: ["city-dragon2-front.jpg", "city-dragon2-back.jpg"], length: ["visit-dragon-front.jpg", "visit-dragron-back.jpg"] },
  { width: ["city-snake2-front.jpg", "city-snake2-back.jpg"], length: ["visit-snake-front.jpg", "visit-snake-back.jpg"] },
  { width: ["city-horse-front.jpg", "city-horse-back.jpg"], length: ["student-horse-front.jpg", "student-horse-back.png"] },
  { width: ["city-sheep-front.jpg", "city-sheep-back.jpg"], length: ["student-sheep-front.png", "student-sheep-back.png"] },
  { width: ["stu-monkey-front.png", "stu-monkey-back.png"], length: ["student-monkey-front.png", "student-monkey-back.png"] },
  { width: ["stu-chicken-front.png", "stu-chicken-back.png"], length: ["student-chicken-front.png", "student-chicken-back.png"] },
  { width: ["stu-dog-front.png", "stu-dog-back.png"], length: ["student-dog-front.png", "student-dog-back.png"] },
  { width: ["stu-pig-front.png", "stu-pig-back.png"], length: ["student-pig-front.png", "student-pig-back.png"] },
] as const;

interface FlipCardProps {
  files: readonly [string, string];
  orientation: "landscape" | "portrait";
  animalName: string;
  flipped: boolean;
  onFlip: () => void;
}

function FlipCard({ files, orientation, animalName, flipped, onFlip }: FlipCardProps) {
  const folder = orientation === "landscape" ? "width" : "length";
  return (
    <button
      type="button"
      className={`hero__card-float hero__card-float--${orientation}`}
      onClick={onFlip}
      aria-label={`${animalName} ${orientation === "landscape" ? "가로" : "세로"} 카드 ${flipped ? "앞면" : "뒷면"} 보기`}
      aria-pressed={flipped}
    >
      <span className={`hero__card-flip${flipped ? " is-flipped" : ""}`}>
        <img className="hero__card-face hero__card-face--front" src={`/images/cards/${folder}/${files[0]}`} alt={`${animalName} 카드 앞면`} />
        <img className="hero__card-face hero__card-face--back" src={`/images/cards/${folder}/${files[1]}`} alt={`${animalName} 카드 뒷면`} />
      </span>
    </button>
  );
}

export function HeroSection() {
  const [zodiacIndex, setZodiacIndex] = useState(0);
  const [landscapeFlipped, setLandscapeFlipped] = useState(false);
  const [portraitFlipped, setPortraitFlipped] = useState(false);
  const paused = useRef(false);

  const selectCard = (index: number) => {
    setZodiacIndex(index);
    setLandscapeFlipped(false);
    setPortraitFlipped(false);
  };

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!paused.current) {
        setZodiacIndex((i) => (i + 1) % CARD_IMAGES.length);
        setLandscapeFlipped(false);
        setPortraitFlipped(false);
      }
    }, CARD_CHANGE_DELAY);
    return () => window.clearInterval(id);
  }, []);

  const pauseHandlers = useMemo(
    () => ({
      onMouseEnter: () => (paused.current = true),
      onMouseLeave: () => (paused.current = false),
      onFocus: () => (paused.current = true),
      onBlur: () => (paused.current = false),
    }),
    [],
  );

  return (
    <section className="hero">
      <div className="hero__bg" aria-hidden="true">
        <Trigram name="건" className="hero__tri hero__tri--tl" />
        <Trigram name="감" className="hero__tri hero__tri--tr" />
      </div>

      <div className="hero__inner page-container">
        <div className="hero__sejong" aria-hidden="true" />
        <div className="hero__copy">
          <p className="hero__eyebrow">한글 오행으로 만나는</p>
          <h1 className="hero__title">명예한국인증·명예시민증<br />학생증·방문증</h1>
          <p className="hero__lead">외국인을 위한 한국 이름 작명 발급 시스템</p>
          <p className="hero__patent">특허 출원 번호 {companyInfo.patentNumber}</p>
        </div>

        <div className="hero__stage">
          <div className="hero__cards" aria-label="카드 예시" {...pauseHandlers}>
            <FlipCard files={CARD_IMAGES[zodiacIndex].width} orientation="landscape" animalName={zodiacSigns[zodiacIndex].nameKo} flipped={landscapeFlipped} onFlip={() => setLandscapeFlipped((value) => !value)} />
            <FlipCard files={CARD_IMAGES[zodiacIndex].length} orientation="portrait" animalName={zodiacSigns[zodiacIndex].nameKo} flipped={portraitFlipped} onFlip={() => setPortraitFlipped((value) => !value)} />
          </div>
        </div>
      </div>

      <div className="hero__zodiac" {...pauseHandlers}>
        <div className="hero__zodiac-inner">
          <Trigram name="리" className="hero__tri hero__ztri hero__ztri--l" />
          <Trigram name="곤" className="hero__tri hero__ztri hero__ztri--r" />
          <p className="hero__zodiac-label hero__zodiac-label--top">KOREAN ZODIAC SIGNS</p>
          <ul className="hero__zodiac-row">
            {zodiacSigns.map((sign, i) => (
              <li key={sign.id} className="hero__zodiac-item">
                <button className="hero__zodiac-btn" onClick={() => selectCard(i)} aria-pressed={i === zodiacIndex} aria-label={`${sign.nameKo} (${sign.nameEn})`}>
                  <ZodiacIcon sign={sign} size={72} highlighted={i === zodiacIndex} />
                </button>
              </li>
            ))}
          </ul>
          <p className="hero__zodiac-label hero__zodiac-label--bottom">KOREAN ZODIAC SIGNS</p>
        </div>
      </div>
    </section>
  );
}

