import { motion } from "framer-motion";

const MotionDiv = motion.div;

// Suzdržan ulazak sadržaja pri scrollanju.
function Reveal({ children, className, delay = 0 }) {
  return (
    <MotionDiv
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionDiv>
  );
}

export default Reveal;
