import { 
  SiSelenium, SiPostman, SiJira, SiJenkins, SiDocker, SiGit 
} from 'react-icons/si';
import { 
  FaBug, FaCode, FaDatabase, FaMobile, FaRobot, FaCheckCircle,
  FaAward, FaUsers, FaBullseye, FaShieldAlt, FaBolt
} from 'react-icons/fa';
import { Code, Shield, Zap } from 'lucide-react';

// Icon mapping object
export const iconMap = {
  // React Icons SI
  SiSelenium,
  SiPostman,
  SiJira,
  SiJenkins,
  SiDocker,
  SiGit,
  
  // React Icons FA
  FaBug,
  FaCode,
  FaDatabase,
  FaMobile,
  FaRobot,
  FaCheckCircle,
  FaAward,
  FaUsers,
  FaBullseye,
  FaShieldAlt,
  FaBolt,
  
  // Lucide React
  Code,
  Shield,
  Zap
};

// Helper function to get icon component
export const getIcon = (iconName) => {
  return iconMap[iconName] || FaCode; // Default to FaCode if icon not found
}; 