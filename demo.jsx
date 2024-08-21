<li
  className={`flex items-center ${
    plan.venue ? "text-red-600" : "text-green-600"
  } space-x-2.5 rtl:space-x-reverse`}
>
  <span
    className={`flex items-center justify-center w-8 h-8 border ${
      plan.venue ? "border-red-600" : "border-green-600"
    } rounded-full shrink-0`}
  >
    <i className={`fas ${plan.venue ? "fa-times" : "fa-check"} fa-xs`}></i>
  </span>
  <span>
    <h3 className="font-medium text-sm leading-tight">Venue</h3>
    <p className="text-xs">{plan.venue ? "Incomplete" : "Complete"}</p>
  </span>
</li>;

{
  /* Decor */
}
<li
  className={`flex items-center ${
    plan.decor ? "text-red-600" : "text-green-600"
  } space-x-2.5 rtl:space-x-reverse`}
>
  <span
    className={`flex items-center justify-center w-8 h-8 border ${
      plan.decor ? "border-red-600" : "border-green-600"
    } rounded-full shrink-0`}
  >
    <i className={`fas ${plan.decor ? "fa-times" : "fa-check"} fa-xs`}></i>
  </span>
  <span>
    <h3 className="font-medium text-sm leading-tight">Decor</h3>
    <p className="text-xs">{plan.decor ? "Incomplete" : "Complete"}</p>
  </span>
</li>;

{
  /* Catering */
}
<li
  className={`flex items-center ${
    plan.catering ? "text-red-600" : "text-green-600"
  } space-x-2.5 rtl:space-x-reverse`}
>
  <span
    className={`flex items-center justify-center w-8 h-8 border ${
      plan.catering ? "border-red-600" : "border-green-600"
    } rounded-full shrink-0`}
  >
    <i className={`fas ${plan.catering ? "fa-times" : "fa-check"} fa-xs`}></i>
  </span>
  <span>
    <h3 className="font-medium text-sm leading-tight">Catering</h3>
    <p className="text-xs">{plan.catering ? "Incomplete" : "Complete"}</p>
  </span>
</li>;

{
  /* Entertainment */
}
<li
  className={`flex items-center ${
    plan.entertainment ? "text-red-600" : "text-green-600"
  } space-x-2.5 rtl:space-x-reverse`}
>
  <span
    className={`flex items-center justify-center w-8 h-8 border ${
      plan.entertainment ? "border-red-600" : "border-green-600"
    } rounded-full shrink-0`}
  >
    <i
      className={`fas ${plan.entertainment ? "fa-times" : "fa-check"} fa-xs`}
    ></i>
  </span>
  <span>
    <h3 className="font-medium text-sm leading-tight">Entertainment</h3>
    <p className="text-xs">{plan.entertainment ? "Incomplete" : "Complete"}</p>
  </span>
</li>;

{
  /* Photographer */
}
<li
  className={`flex items-center ${
    plan.photographer ? "text-red-600" : "text-green-600"
  } space-x-2.5 rtl:space-x-reverse`}
>
  <span
    className={`flex items-center justify-center w-8 h-8 border ${
      plan.photographer ? "border-red-600" : "border-green-600"
    } rounded-full shrink-0`}
  >
    <i
      className={`fas ${plan.photographer ? "fa-times" : "fa-check"} fa-xs`}
    ></i>
  </span>
  <span>
    <h3 className="font-medium text-sm leading-tight">Photographer</h3>
    <p className="text-xs">{plan.photographer ? "Incomplete" : "Complete"}</p>
  </span>
</li>;

{
  /* Transportation */
}
<li
  className={`flex items-center ${
    plan.transportation ? "text-red-600" : "text-green-600"
  } space-x-2.5 rtl:space-x-reverse`}
>
  <span
    className={`flex items-center justify-center w-8 h-8 border ${
      plan.transportation ? "border-red-600" : "border-green-600"
    } rounded-full shrink-0`}
  >
    <i
      className={`fas ${plan.transportation ? "fa-times" : "fa-check"} fa-xs`}
    ></i>
  </span>
  <span>
    <h3 className="font-medium text-sm leading-tight">Transportation</h3>
    <p className="text-xs">{plan.transportation ? "Incomplete" : "Complete"}</p>
  </span>
</li>;

{
  /* Wedding Cake */
}
<li
  className={`flex items-center ${
    plan.wedding_cake ? "text-red-600" : "text-green-600"
  } space-x-2.5 rtl:space-x-reverse`}
>
  <span
    className={`flex items-center justify-center w-8 h-8 border ${
      plan.wedding_cake ? "border-red-600" : "border-green-600"
    } rounded-full shrink-0`}
  >
    <i
      className={`fas ${plan.wedding_cake ? "fa-times" : "fa-check"} fa-xs`}
    ></i>
  </span>
  <span>
    <h3 className="font-medium text-sm leading-tight">Wedding Cake</h3>
    <p className="text-xs">{plan.wedding_cake ? "Incomplete" : "Complete"}</p>
  </span>
</li>;
