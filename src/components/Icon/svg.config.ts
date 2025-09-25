// src/components/ui/icons/svg.config.ts

import * as Icons from './index';
import type { FunctionComponent, SVGProps } from 'react';

export type SvgIconKey =
  | 'ArrowLeft'
  | 'CalendarIcon'
  | 'CheckCircle'
  | 'ChevronDown'
  | 'Search'
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'ChevronUp'
  | 'Download'
  | 'Graphic'
  | 'History'
  | 'List'
  | 'Logout'
  | 'Plus'
  | 'UserStar'
  | 'Monitor'
  | 'MoreVertical'
  | 'Projetor'
  | 'Tomada'
  | 'Trash'
  | 'Wifi'
  | 'IconX';

export const SVG_OPTIONS: Record<SvgIconKey, FunctionComponent<SVGProps<SVGSVGElement>>> = {
  ArrowLeft: Icons.ArrowLeft,
  CalendarIcon: Icons.CalendarIcon,
  CheckCircle: Icons.CheckCircle,
  ChevronDown: Icons.ChevronDown,
  Search: Icons.Search,
  ChevronLeft: Icons.ChevronLeft,
  ChevronRight: Icons.ChevronRight,
  ChevronUp: Icons.ChevronUp,
  Download: Icons.Download,
  Graphic: Icons.Graphic,
  History: Icons.History,
  List: Icons.List,
  Logout: Icons.Logout,
  Plus: Icons.Plus,
  UserStar: Icons.UserStar,
  Monitor: Icons.Monitor,
  MoreVertical: Icons.MoreVertical,
  Projetor: Icons.Projetor,
  Tomada: Icons.Tomada,
  Trash: Icons.Trash,
  Wifi: Icons.Wifi,
  IconX: Icons.IconX,
};