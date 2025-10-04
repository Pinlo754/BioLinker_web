import { Template } from "../useDashboard";

interface TemplateLayerProps {
  template: Template;
}

const TemplateLayer = ({ template }: TemplateLayerProps) => {
  return (
    <div
      key={template.id}
      className="relative rounded-2xl shadow-md hover:shadow-lg transition font-helvetica"
    >
      <img
        src={template.image}
        alt={template.name}
        className="w-full object-cover"
      />
      <h2 className="absolute top-6 left-6 text-lg text-white font-bold">
        {template.name}
      </h2>
      <p className="absolute top-16 left-20 text-white text-sm font-semibold text-center">
        {template.author}
      </p>
      <div className="flex items-center gap-2">
        <img
          src={template.authorAvatar}
          alt={template.author}
          className="absolute top-14 left-10 w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};

export default TemplateLayer;
