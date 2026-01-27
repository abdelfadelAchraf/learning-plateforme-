// import React, { useState } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
// import MarkdownEditor from '../../common/MarkdownEditor';

// const courseSchema = z.object({
//   title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
//   description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
//   subject: z.enum([
//     'mathematics',
//     'physics',
//     'chemistry',
//     'biology',
//     'computerScience',
//     'history',
//     'geography',
//     'languages',
//   ]),
//   chapters: z.array(
//     z.object({
//       title: z.string().min(3, 'Le titre du chapitre doit contenir au moins 3 caractères'),
//       content: z.string().min(10, 'Le contenu doit contenir au moins 10 caractères'),
//       order: z.number().min(1, 'L\'ordre doit être supérieur à 0'),
//     })
//   ).min(1, 'Au moins un chapitre est requis'),
// });

// type CourseFormData = z.infer<typeof courseSchema>;

// interface CourseFormProps {
//   initialData?: Course;
//   onSubmit: (data: CourseFormData) => void;
//   loading?: boolean;
// }

// const CourseForm: React.FC<CourseFormProps> = ({
//   initialData,
//   onSubmit,
//   loading = false,
// }) => {
//   const {
//     register,
//     control,
//     handleSubmit,
//     formState: { errors },
//     watch,
//     setValue,
//   } = useForm<CourseFormData>({
//     resolver: zodResolver(courseSchema),
//     defaultValues: initialData || {
//       title: '',
//       description: '',
//       subject: 'mathematics',
//       chapters: [{ title: '', content: '', order: 1 }],
//     },
//   });

//   const { fields, append, remove, move } = useFieldArray({
//     control,
//     name: 'chapters',
//   });

//   const subjects: Subject[] = [
//     'mathematics',
//     'physics',
//     'chemistry',
//     'biology',
//     'computerScience',
//     'history',
//     'geography',
//     'languages',
//   ];

//   const getSubjectLabel = (subject: Subject) => {
//     const labels: Record<Subject, string> = {
//       mathematics: 'Mathématiques',
//       physics: 'Physique',
//       chemistry: 'Chimie',
//       biology: 'Biologie',
//       computerScience: 'Informatique',
//       history: 'Histoire',
//       geography: 'Géographie',
//       languages: 'Langues',
//     };
//     return labels[subject];
//   };

//   const addChapter = () => {
//     const nextOrder = fields.length + 1;
//     append({ title: '', content: '', order: nextOrder });
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//       {/* Basic Info */}
//       <div className="bg-white rounded-xl shadow-sm border p-6">
//         <h2 className="text-lg font-semibold mb-6">Informations de base</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Titre du cours *
//             </label>
//             <input
//               type="text"
//               {...register('title')}
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
//                 errors.title ? 'border-red-300' : 'border-gray-300'
//               }`}
//               placeholder="Ex: Introduction au calcul intégral"
//             />
//             {errors.title && (
//               <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
//             )}
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Matière *
//             </label>
//             <select
//               {...register('subject')}
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
//                 errors.subject ? 'border-red-300' : 'border-gray-300'
//               }`}
//             >
//               {subjects.map((subject) => (
//                 <option key={subject} value={subject}>
//                   {getSubjectLabel(subject)}
//                 </option>
//               ))}
//             </select>
//             {errors.subject && (
//               <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
//             )}
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Description *
//             </label>
//             <textarea
//               {...register('description')}
//               rows={3}
//               className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
//                 errors.description ? 'border-red-300' : 'border-gray-300'
//               }`}
//               placeholder="Décrivez brièvement le contenu de ce cours..."
//             />
//             {errors.description && (
//               <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Chapters */}
//       <div className="bg-white rounded-xl shadow-sm border p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-lg font-semibold">Chapitres</h2>
//           <button
//             type="button"
//             onClick={addChapter}
//             className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
//           >
//             <Plus className="w-4 h-4 mr-2" />
//             Ajouter un chapitre
//           </button>
//         </div>

//         <div className="space-y-6">
//           {fields.map((field, index) => (
//             <div key={field.id} className="border rounded-lg p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="font-medium">Chapitre {index + 1}</h3>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     type="button"
//                     onClick={() => move(index, index - 1)}
//                     disabled={index === 0}
//                     className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
//                   >
//                     <ChevronUp className="w-5 h-5" />
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => move(index, index + 1)}
//                     disabled={index === fields.length - 1}
//                     className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
//                   >
//                     <ChevronDown className="w-5 h-5" />
//                   </button>
//                   {fields.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => remove(index)}
//                       className="p-1 text-red-500 hover:text-red-700"
//                     >
//                       <Trash2 className="w-5 h-5" />
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Titre du chapitre *
//                   </label>
//                   <input
//                     type="text"
//                     {...register(`chapters.${index}.title` as const)}
//                     className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
//                       errors.chapters?.[index]?.title ? 'border-red-300' : 'border-gray-300'
//                     }`}
//                     placeholder="Ex: Introduction aux dérivées"
//                   />
//                   {errors.chapters?.[index]?.title && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors.chapters[index].title?.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Contenu (Markdown avec LaTeX) *
//                   </label>
//                   <MarkdownEditor
//                     value={watch(`chapters.${index}.content`)}
//                     onChange={(value) =>
//                       setValue(`chapters.${index}.content` as const, value)
//                     }
//                     placeholder="Écrivez le contenu de votre chapitre en utilisant Markdown et LaTeX pour les formules mathématiques..."
//                   />
//                   {errors.chapters?.[index]?.content && (
//                     <p className="mt-1 text-sm text-red-600">
//                       {errors.chapters[index].content?.message}
//                     </p>
//                   )}
//                 </div>

//                 <div className="w-32">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Ordre
//                   </label>
//                   <input
//                     type="number"
//                     {...register(`chapters.${index}.order` as const, {
//                       valueAsNumber: true,
//                     })}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
//                     min="1"
//                   />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {errors.chapters?.message && (
//           <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
//             <p className="text-sm text-red-600">{errors.chapters.message}</p>
//           </div>
//         )}
//       </div>

//       {/* Submit */}
//       <div className="flex justify-end space-x-4">
//         <button
//           type="button"
//           onClick={() => window.history.back()}
//           className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//           disabled={loading}
//         >
//           Annuler
//         </button>
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//         >
//           {loading ? 'Enregistrement...' : initialData ? 'Mettre à jour' : 'Créer le cours'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default CourseForm;