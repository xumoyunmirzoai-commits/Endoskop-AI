import React, { useState } from 'react';
import { useI18n } from '../i18n/I18nContext';
import { ThumbsUpIcon, ThumbsDownIcon } from './IconComponents';

interface FeedbackProps {
  onSubmit: (rating: 'good' | 'bad', comment: string) => void;
}

export const Feedback: React.FC<FeedbackProps> = ({ onSubmit }) => {
  const { t } = useI18n();
  const [rating, setRating] = useState<'good' | 'bad' | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (rating) {
      onSubmit(rating, comment);
    }
  };

  return (
    <div className="mt-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">{t('feedback.title')}</h3>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setRating('good')}
          className={`flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
            rating === 'good'
              ? 'bg-green-100 border-green-400 text-green-800 ring-2 ring-green-300'
              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
          }`}
          aria-pressed={rating === 'good'}
        >
          <ThumbsUpIcon className="w-5 h-5 mr-2" />
          {t('feedback.accurate')}
        </button>
        <button
          onClick={() => setRating('bad')}
          className={`flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
            rating === 'bad'
              ? 'bg-red-100 border-red-400 text-red-800 ring-2 ring-red-300'
              : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
          }`}
          aria-pressed={rating === 'bad'}
        >
          <ThumbsDownIcon className="w-5 h-5 mr-2" />
          {t('feedback.inaccurate')}
        </button>
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={t('feedback.commentPlaceholder')}
        className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        rows={3}
      />
      <button
        onClick={handleSubmit}
        disabled={!rating}
        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
      >
        {t('feedback.submit')}
      </button>
    </div>
  );
};
