import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';

const Onyx = () => {
  const context = useContext(AppContext);
  const { state } = context;
  const { data, theme } = state;

  const Photo = () =>
    data.profile.photo && (
      <img
        className="rounded object-cover mr-4"
        src={data.profile.photo}
        alt="Resume Photograph"
        style={{ width: '120px', height: '120px' }}
      />
    );

  const Profile = () => (
    <div>
      <h1 className="font-bold text-4xl" style={{ color: theme.colors.accent }}>
        {data.profile.firstName} {data.profile.lastName}
      </h1>
      <h6 className="font-medium text-sm">{data.profile.subtitle}</h6>

      <div className="flex flex-col mt-4 text-xs">
        <span>{data.profile.address.line1}</span>
        <span>{data.profile.address.line2}</span>
        <span>{data.profile.address.line3}</span>
      </div>
    </div>
  );

  const ContactItem = ({ icon, value }) =>
    value && (
      <div className="flex items-center my-3">
        <span className="material-icons text-lg mr-2" style={{ color: theme.colors.accent }}>
          {icon}
        </span>
        <span className="font-medium break-all">{value}</span>
      </div>
    );

  const Heading = ({ title }) => (
    <h6 className="text-xs font-bold uppercase mt-6 mb-2" style={{ color: theme.colors.accent }}>
      {title}
    </h6>
  );

  const Objective = () =>
    data.objective.enable && (
      <div>
        <Heading title={data.objective.heading} />
        <ReactMarkdown className="text-sm" source={data.objective.body} />
      </div>
    );

  const WorkItem = x => (
    <div key={x.title} className="mt-3">
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold">{x.title}</h6>
          <p className="text-xs">{x.role}</p>
        </div>
        <span className="text-xs font-medium">
          ({x.start} - {x.end})
        </span>
      </div>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Work = () =>
    data.work.enable && (
      <div>
        <Heading title={data.work.heading} />
        {data.work.items.map(WorkItem)}
      </div>
    );

  const EducationItem = x => (
    <div key={x.name} className="mt-3">
      <div className="flex justify-between">
        <div>
          <h6 className="font-semibold">{x.name}</h6>
          <p className="text-xs">{x.major}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold">{x.grade}</span>
          <span className="text-xs font-medium">
            ({x.start} - {x.end})
          </span>
        </div>
      </div>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Education = () =>
    data.education.enable && (
      <div>
        <Heading title={data.education.heading} />
        {data.education.items.map(EducationItem)}
      </div>
    );

  const AwardItem = x => (
    <div key={x.title} className="mt-3">
      <h6 className="font-semibold">{x.title}</h6>
      <p className="text-xs">{x.subtitle}</p>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Awards = () =>
    data.awards.enable && (
      <div>
        <Heading title={data.awards.heading} />
        {data.awards.items.map(AwardItem)}
      </div>
    );

  const CertificationItem = x => (
    <div key={x.title} className="mt-3">
      <h6 className="font-semibold">{x.title}</h6>
      <p className="text-xs">{x.subtitle}</p>
      <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
  );

  const Certifications = () =>
    data.certifications.enable && (
      <div>
        <Heading title={data.certifications.heading} />
        {data.certifications.items.map(CertificationItem)}
      </div>
    );

  const SkillItem = x => (
    <span
      key={x}
      className="text-xs rounded-full px-3 py-1 font-medium my-2 mr-2"
      style={{
        backgroundColor: theme.colors.primary,
        color: theme.colors.background,
      }}
    >
      {x}
    </span>
  );

  const Skills = () =>
    data.skills.enable && (
      <div>
        <Heading title={data.skills.heading} />
        <div className="mt-1 flex flex-wrap">{data.skills.items.map(SkillItem)}</div>
      </div>
    );

  const ExtraItem = x => (
    <tr key={x.key}>
      <td className="border font-medium px-4 py-2 text-sm">{x.key}</td>
      <td className="border px-4 py-2 text-sm">{x.value}</td>
    </tr>
  );

  const Extras = () =>
    data.extras.enable && (
      <div>
        <Heading title={data.extras.heading} />
        <table className="w-2/3 table-auto">
          <tbody>{data.extras.items.map(ExtraItem)}</tbody>
        </table>
      </div>
    );

  return (
    <div
      style={{
        fontFamily: theme.font.family,
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      }}
    >
      <div className="grid grid-cols-4 items-center">
        <div className="col-span-3 flex items-center">
          <Photo />
          <Profile />
        </div>

        <div className="col-span-1 text-xs">
          <ContactItem icon="phone" value={data.profile.phone} />
          <ContactItem icon="language" value={data.profile.website} />
          <ContactItem icon="alternate_email" value={data.profile.email} />
        </div>
      </div>

      <hr className="my-6" />

      <Objective />
      <Work />
      <Education />

      <div className="grid grid-cols-2">
        <Awards />
        <Certifications />
      </div>

      <Skills />
      <Extras />
    </div>
  );
};

export default Onyx;
