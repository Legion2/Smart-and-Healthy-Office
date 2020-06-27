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
    (= (change_room_cool_down {{userId}}) {{changeRoomCoolDown}})
{{/users}}
{{#rooms}}
    (= (stress {{roomId}}) {{stress}})
    (= (stress_plus_changing_room {{roomId}}) {{stressPlusChangingRoom}})
{{/rooms}}
    (= (total-cost) 0)
)


(:goal
    (forall (?u - user) (and (exists (?r - room) (is_next_at ?u ?r))
                                (not (extra_cost_change_room_cool_down ?u))))
)
(:metric minimize (total-cost))
)
