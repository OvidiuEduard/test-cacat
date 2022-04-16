import { useState } from "react";
import Image from "next/image";
import styles from "../../styles/caca.module.scss";
import { motion } from "framer-motion";
import FirstComponent from "../components/FirstComponent";
import Link from 'next/link'

function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [varsta, setVarsta] = useState("");

  const fetchComments = async () => {
    const response = await fetch("/api/comments");
    const data = await response.json();
    setComments(data);
  };

  const submitComment = async () => {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="aici e numele"
      />
      <input
        type="text"
        value={varsta}
        placeholder="baga varsta"
        onChange={(e) => setVarsta(e.target.value)}
      />
      <button onClick={submitComment}>adauga comentariu</button>
      <button onClick={fetchComments}>Load stuff</button>
      <div className={styles.nujContainer}>
        {comments.map((comment) => {
          return (
            <div key={comment.id} className={styles.blaContainer}>
              <h1 className={styles.title}>{comment.text}</h1>
              <p>{comment.descriere}</p>
              <motion.div
                className={styles.imageBla}
                animate={{
                  scale: [1, 1.1, 1.2, 1, 1],
                  rotate: [0, 0, 110, 10, 0],
                  borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
              >
                {/* <Image
                  objectFit="contain"
                  loading="lazy"
                  src={comment.img}
                  alt="Galaxy"
                  width={1000}
                  height={750}
                  className={styles.imageBla}
                /> */}
              </motion.div>
              <h1>cacat</h1>
              <Link href="/components/FirstComponent">HAIDA</Link>
            </div>
            
          );
        })}
      </div>
    </>
  );
}

export default CommentsPage;
