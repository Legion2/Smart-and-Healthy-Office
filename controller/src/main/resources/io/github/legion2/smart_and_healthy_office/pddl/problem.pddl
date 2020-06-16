(define (problem test)

(:domain smart-and-healthy-office)

(:objects
{{#rooms}}
    {{roomId}} - room
{{/rooms}}
{{#users}}
    {{userId}} - user
{{/users}}
)

(:init
{{#users}}
    (is_currently_at {{userId}} {{currentRoom}})
{{/users}}
{{#rooms}}
    (= (stress {{roomId}}) {{stress}})
    (= (stress_plus_changing_room {{roomId}}) {{stressPlusChangingRoom}})
{{/rooms}}
    (= (total-cost) 0)
)


(:goal
    (forall (?u - user) (exists (?r - room) (is_next_at ?u ?r)))
)
(:metric minimize (total-cost))
)
