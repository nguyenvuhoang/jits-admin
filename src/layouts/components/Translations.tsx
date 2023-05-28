// ** Third Party Import
import { useTranslation } from 'next-i18next'

interface Props {
  text: string
}

const Translations = ({ text }: Props) => {
  // ** Hook
  const { t } = useTranslation('common')
  return <>{`${t(text)}`}</>
}

export default Translations
